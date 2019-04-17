const express = require('express');
const router = express.Router();
const Intent = require('../models/intent');

router.post('/getresponse/:_accessID', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let data = NLP.getClassifiedData(req.body.expression).classified;
    let resToSend = "Not trained for this";

    if (data != undefined) {
        Intent.findOne({
            user: req.params._accessID,
            key: data
        }, function (err, iIntent) {
            if (err) {
                console.log("No intent found: " + err);
            } else if(iIntent) {
                if (iIntent.responses.length > 0) {
                    let replyRandomIndex = Math.floor(Math.random() * iIntent.responses.length);
                    resToSend = iIntent.responses[replyRandomIndex];
                }
                if (resToSend == undefined || resToSend == "") {
                    resToSend = "Not trained for this";
                }
                res.json({fulfillment: resToSend});
            }else{
                res.json({fulfillment: resToSend});
            }
        });
    } else {
        res.json({fulfillment: resToSend});
    }
});

module.exports = router;