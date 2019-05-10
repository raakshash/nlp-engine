"use strict";

const Intent = require('../models/intent');

exports.init = function(iUser){
    let userData = {};
    if(iUser !== undefined){
        userData.user = iUser._id;
    }
    Intent.find(userData, function (err, iIntents) {
        if (err) {
            console.log("database giving problem on first intent")
        } else if (iIntents.length > 0) {
            iIntents.forEach(function (iIntent) {
                iIntent.expressions.forEach(function (iExpression) {
                    NLP.addClassifiedData(iExpression, iIntent.key);
                });
            })
        } else if(iUser._id != undefined) {
            var intent = new Intent({
                user: iUser._id,
                key: "createKitchen",
                value: "Create Kitchen",
                expressions: ["I want to create kitchen"],
                responses: []
            });
            intent.save(function (err) {
                if (err) {
                    console.log("Intenet is not saved successfully" + err);
                } else {
                    NLP.addClassifiedData(intent.expressions[0], intent.key);
                }
            });
        }
    });
}