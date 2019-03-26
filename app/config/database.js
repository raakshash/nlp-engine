"use strict";
const mongoose = require("mongoose");


exports.init = function () {
    const dbURL = process.env.DB || "mongodb://localhost:27017/nlpdata";

    mongoose.connect(dbURL, {
        useNewUrlParser: true
    });

    mongoose.connection.on("connected", function () {
        console.log("app connected to mongodb @ 27017");

        const Intent = require('../models/intent');
        const nlp = require('../nltk/natural.js');
        Intent.find(function (err, iIntents) {
            if (err) {
                console.log("database giving problem on first intent")
            } else if (iIntents.length > 0) {
                iIntents.forEach(function (iIntent) {
                    iIntent.expressions.forEach(function (iExpression) {
                        nlp.addClassifiedData(iExpression, iIntent.key);
                    });
                })
            } else {
                var intent = new Intent({
                    key: "createKitchen",
                    value: "Create Kitchen",
                    expressions: ["I want to create kitchen"],
                    responses: []
                });
                intent.save(function (err) {
                    if (err) {
                        console.log("Intenet is not saved successfully" + err);
                    } else {
                        nlp.addClassifiedData(intent.expressions[0], intent.key);
                    }
                });
            }
        });
    });

    mongoose.connection.on("error", function (err) {
        console.log("app connection fail :" + err);
    });
}