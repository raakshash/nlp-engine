const express = require('express');
const router = express.Router();
const IntentManager = require('../controllers/intentManager');
const ResponseManager = require('../controllers/responseManager');

router.post('/getResponse/:_accessID', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.body.expression != undefined) {
        let POST = req.body;
        let intentID = "";
        try {
            intentID = NLP.getClassifiedData(POST.expression).classified;
        } catch (e) {
            console.error("Error: ", e);
        }
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
    } else {
        if (req.method == 'POST') {
            let body = '';
            req.on('data', function (data) {
                body += data;
                if (body.length > 1e6) {
                    req.connection.destroy();
                }
            });
            req.on('end', function () {
                let POST = JSON.parse(body);
                let intentID = "";
                try {
                    intentID = NLP.getClassifiedData(POST.expression).classified;
                } catch (e) {
                    console.error("Error: ", e);
                }
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
        }
    }
});

module.exports = router;