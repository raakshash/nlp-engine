"use strict";
const mongoose = require("mongoose");


exports.init = function () {
    const dbURL = process.env.DB || "mongodb://vdevpril908plp.dsone.3ds.com:27017/nlpdata";

    mongoose.connect(dbURL, {
        useNewUrlParser: true
    });

    mongoose.connection.on("connected", function () {
        console.log("app connected to mongodb @ 27017");
    });

    mongoose.connection.on("error", function (err) {
        console.log("app connection fail :" + err);
    });
}