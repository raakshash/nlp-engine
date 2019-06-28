"use strict";

const IntentManager = require('../controllers/intentManager');
const ExpressionManager = require('../controllers/expressionManager');

exports.init = function (iUser) {
    if (iUser !== undefined && iUser._id != undefined) {
        IntentManager.findAllIntents(iUser._id, function (err, iIntents) {
            if (err) {
                console.log("database giving problem on first intent")
            } else if (iIntents != undefined) {
                iIntents.forEach(function (iIntent) {
                    ExpressionManager.findAllExpressions(iIntent._id, function (err, iExpressions) {
                        iExpressions.forEach(function (iExpression) {
                            NLP.addClassifiedData(iExpression.value, iIntent._id);
                        });
                    });
                })
            } else {
                IntentManager.addIntent(iUser._id, "Create Kitchen", function (err) {
                    if (err) {
                        console.log("Problem in intiating intents", err);
                    }
                });
            }
        });
    }
}