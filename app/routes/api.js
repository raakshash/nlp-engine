var express = require('express');
var router = express.Router();
var nlp = require('../nltk/natural.js');

var Intent = require('../models/intent');

Intent.findOne({
    "key": "createKitchen"
}, function (err, iIntent) {
    if (err) {
        console.log("database giving problem on first intent")
    }else if(!iIntent) {
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

router.get('/intents', function (req, res, next) {
    Intent.find(function (err, iIntents) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.json(iIntents);
        }
    })
});

router.post('/addintent', function (req, res, next) {
    let newIntent = new Intent();
    newIntent.key = newIntent.makeKey(req.body.intent)
    newIntent.value = req.body.intent;
    newIntent.expressions = [];
    newIntent.responses = [];
    newIntent.save(function (err) {
        if (err) {
            console.log("Intenet is not saved successfully" + err);
        } else {
            res.json(newIntent);
        }
    })
});

router.post('/addintent/:_intent', function (req, res, next) {
    let expression = req.body.expression;
    Intent.findOne({
        "key": req.params._intent
    }, function (err, iIntent) {
        if (err) {
            console.log("No intent found: " + err);
        } else {
            iIntent.expressions.push(expression);
            if (expression != undefined) {
                nlp.addClassifiedData(expression, iIntent.key);
            }
            iIntent.save(function (err) {
                if (err) {
                    console.log("Intenet is not saved successfully" + err);
                } else {
                    res.json(iIntent);
                }
            });
        }
    });
});

router.post('/getresponse', function (req, res, next) {
    let data = nlp.getClassifiedData(req.body.expression).classification;
    let resToSend = "";

    Intent.findOne({
        "key": data[0].label
    }, function (err, iIntent) {
        if (err) {
            console.log("No intent found: " + err);
        } else {
            let replyRandomIndex = Math.floor(Math.random() * iIntent.responses.length);
            resToSend = iIntent.responses[replyRandomIndex];
            if (resToSend == undefined || resToSend == "") {
                resToSend = "Not trained for this";
            }
            res.json(resToSend)
        }
    });
});

router.post('/addresponse/:_intent', function (req, res, next) {
    var newResponse = req.body.response;
    Intent.findOne({
        "key": req.params._intent
    }, function (err, iIntent) {
        if (err) {
            console.log("No intent found: " + err);
        } else {
            iIntent.responses.push(newResponse);
            iIntent.save(function (err) {
                if (err) {
                    console.log("Intenet is not saved successfully" + err);
                } else {
                    res.json(iIntent);
                }
            })
        }
    });
});

module.exports = router;