const express = require('express');
const router = express.Router();
const Intent = require('../models/intent');

router.get('/getintents', function (req, res, next) {
    Intent.find({
        user: req.user._id
    }, function (err, iIntents) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.json(iIntents);
        }
    })
});

router.post('/addintent', function (req, res, next) {
    let newIntent = new Intent();
    newIntent.user = req.user._id;
    newIntent.key = newIntent.makeKey(req.body.intentName)
    newIntent.value = req.body.intentName;
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

router.post('/addexpression/:_intent', function (req, res, next) {
    let expression = req.body.expression;
    Intent.findOne({
        user: req.user._id
    }, {
        key: req.params._intent
    }, function (err, iIntent) {
        if (err) {
            console.log("No intent found: " + err);
        } else {
            iIntent.expressions.push(expression);
            if (expression != undefined) {
                NLP.addClassifiedData(expression, iIntent.key);
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
    let data = NLP.getClassifiedData(req.body.expression).classification;
    let resToSend = "";

    if (data.length > 0) {
        Intent.findOne({
            user: req.user._id
        }, {
            key: data[0].label
        }, function (err, iIntent) {
            if (err) {
                console.log("No intent found: " + err);
            } else {
                let replyRandomIndex = Math.floor(Math.random() * iIntent.responses.length);
                resToSend = iIntent.responses[replyRandomIndex];
                if (resToSend == undefined || resToSend == "") {
                    resToSend = "Not trained for this";
                }
                res.json(resToSend);
            }
        });
    } else {
        resToSend = "Not trained for this";
        res.json(resToSend)
    }
});

router.post('/addresponse/:_intent', function (req, res, next) {
    var newResponse = req.body.response;
    Intent.findOne({
        user: req.user._id
    }, {
        key: req.params._intent
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