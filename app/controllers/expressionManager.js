const Expression = require('../models/expression');


class ExpressionManager {
    constructor() { }

    addExpreesion(iIntentID, iExpression, iCallback) {
        if (iExpression != undefined && iExpression != "") {
            let newExpression = new Expression();
            newExpression.intentID = iIntentID;
            newExpression.value = iExpression;
            newExpression.save(function (err) {
                if (err) {
                    iCallback(err);
                } else {
                    NLP.addClassifiedData(iExpression, iIntentID);
                    iCallback(null);
                }
            });
        } else {
            iCallback("Please add a valid expression");
        }
    }
    deleteOneExpression(iExpressionID, iCallback) {
        Expression.deleteOne({ _id: iExpressionID }, function (err) {
            iCallback(err);
        });
    }

    deleteAllIntentExpressions(iIntentID, iCallback) {
        Expression.deleteMany({ intentID: iIntentID }, function (err) {
            iCallback(err);
        })
    }

    findAllExpressions(iIntentID, iCallback) {
        Expression.find({ intentID: iIntentID }, function (err, iExpressions) {
            if (err) {
                iCallback(err, null);
            } else if (iExpressions) {
                iCallback(null, iExpressions);
            } else {
                iCallback(err, null);
            }
        });
    }
};

const manager = new ExpressionManager();

module.exports = manager;