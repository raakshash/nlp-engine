const express = require('express');
const router = express.Router();
const Intent = require('../models/intent');

router.post('/getresponse/:_accessID', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let data = NLP.getClassifiedData(req.body.expression).classification;
    let resToSend = "";

    if (data.length > 0) {
        Intent.findOne({
            user: req.params._accessID,
            key: data[0].label
        }, function (err, iIntent) {
            if (err) {
                console.log("No intent found: " + err);
            } else {
                if (iIntent.responses.length > 0) {
                    let replyRandomIndex = Math.floor(Math.random() * iIntent.responses.length);
                    resToSend = iIntent.responses[replyRandomIndex];
                }
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

module.exports = router;