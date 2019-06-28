const express = require('express');
const router = express.Router();

const IntentManager = require('../controllers/intentManager');
const ExpressionManager = require('../controllers/expressionManager');
const ResponseManager = require('../controllers/responseManager');

router.get('/getAllIntents', function (req, res, next) {
    IntentManager.findAllIntents(req.user._id, function(err, iIntents){
        if(err){
            console.log("No intent found: " + err);
        }else if(iIntents){
            res.json(iIntents);
        }else{
            res.json([]);
        }
    })
});

router.get('/getAllExpressions/:_intentID', function(req, res, next){
    ExpressionManager.findAllExpressions(req.params._intentID, function(err, iExpressions){
        if(err){
            console.log("No expressions found", err);
        }else{
            res.json(iExpressions);
        }
    });
});

router.get('/getAllResponses/:_intentID', function(req, res, next){
    ResponseManager.findAllResponses(req.params._intentID, function(err, iResponses){
        if(err){
            console.log("No expressions found", err);
        }else{
            res.json(iResponses);
        }
    });
});

router.post('/addIntent', function (req, res, next) {
    IntentManager.addIntent(req.user._id, req.body.intentName, function (err) {
        if (err) {
            console.log("Intent is not saved successfully" + err);
            res.json(false);
        } else {
            res.json(true);
        }
    });
});

router.post('/addExpression/:_intentID', function (req, res, next) {
    ExpressionManager.addExpreesion(req.params._intentID, req.body.expression, function (err) {
        if (err) {
            console.log("expression is not saved successfully" + err);
            res.json(false);
        } else {
            res.json(true);
        }
    });
});

router.post('/addResponse/:_intentID', function (req, res, next) {
    ResponseManager.addResponse(req.params._intentID, req.body.response, function (err) {
        if (err) {
            console.log("Intenet is not saved successfully" + err);
            res.json(false);
        } else {
            res.json(true);
        }
    });
});

router.post('/updateAction/:_intentID', function (req, res, next) {
    IntentManager.updateAction(req.params._intentID, req.body.intentAction, function (err, iIntent) {
        if (err) {
            console.log("Action not updated succesfully", err);
        } else {
            res.json(iIntent);
        }
    });
});

router.delete('/deleteResponse/:_responseID', function (req, res, next) {
    ResponseManager.deleteOneResponse(req.params._responseID, function (err) {
        if (err) {
            console.log("Response not deleted successfully", err);
            res.json({done: false});
        }else{
            res.json({done: true});
        }
    });
});

router.delete('/deleteExpression/:_expressionID', function (req, res, next) {
    ExpressionManager.deleteOneExpression(req.params._expressionID, function (err) {
        if (err) {
            console.log("Response not deleted successfully", err);
            res.json({done: false});
        }else{
            res.json({done: true});
        }
    });
});

router.delete('/deleteIntent/:_intentID', function (req, res, next) {
    IntentManager.deleteIntent(req.params._intentID, function (err) {
        if (err) {
            console.log("Intent not deleted successfully", err);
            res.json({done: false});
        }else{
            res.json({done: true});
        }
    })
});

module.exports = router;