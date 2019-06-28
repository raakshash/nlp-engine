const express = require('express');
const router = express.Router();
const IntentManager = require('../controllers/intentManager');
const ResponseManager = require('../controllers/responseManager');

router.post('/getResponse/:_accessID', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let intentID = NLP.getClassifiedData(req.body.expression).classified;
    let resToSend = "Not trained for this";

    if (intentID != undefined) {
        IntentManager.findIntent(req.params._accessID, intentID, function (err, iIntent) {
            if (err) {
                console.log("No intent found: " + err);
            } else if (iIntent != undefined) {
                ResponseManager.findAllResponses(iIntent._id, function (err, iResponses) {
                    if (iResponses.length > 0) {
                        let replyRandomIndex = Math.floor(Math.random() * iResponses.length);
                        resToSend = iResponses[replyRandomIndex];
                    }
                    if (resToSend == undefined || resToSend == "") {
                        resToSend = "Not trained for this";
                    }
                    res.json({ intent: iIntent, fulfillment: resToSend, expression: req.body.expression });
                });
            } else {
                res.json({ intent: null, fulfillment: resToSend, expression: req.body.expression });
            }
        });
    } else {
        res.json({ intent: null, fulfillment: resToSend, expression: req.body.expression });
    }
});

module.exports = router;