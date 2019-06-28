const Intent = require('../models/intent');
const ExpressionManager = require('../controllers/expressionManager');
const ResponseManager = require('../controllers/responseManager');


class IntentManager {
    constructor() { }

    addIntent(iUserID, iIntentName, iCallback) {
        if (iIntentName != undefined && iIntentName != "") {
            let newIntent = new Intent();
            let key = newIntent.makeKey(iIntentName);
            newIntent.user = iUserID;
            newIntent.key = key;
            newIntent.value = iIntentName;
            newIntent.intentAction = key;
            newIntent.save(function (err) {
                if (err) {
                    iCallback(err);
                } else {
                    iCallback(null);
                }
            });
        } else {
            iCallback("No valid intent");
        }
    }
    deleteIntent(iIntentID, iCallback) {
        Intent.deleteOne({ _id: iIntentID }, function (err) {
            if (err) {
                iCallback(err);
            } else {
                ResponseManager.deleteAllIntentResponse(iIntentID, function (err) {
                    if (err) {
                        iCallback(err);
                    } else {
                        ExpressionManager.deleteAllIntentExpressions(iIntentID, function (err) {
                            iCallback(err);
                        });
                    }
                });
            }
        });
    }

    findAllIntents(iUserID, iCallback) {
        Intent.find({ user: iUserID }, function (err, iIntents) {
            if (err) {
                iCallback(err, null);
            } else if (iIntents.length > 0) {
                iCallback(null, iIntents);
            } else {
                iCallback(err, null);
            }
        });
    }

    findIntent(iUserID, iIntentID, iCallback) {
        Intent.findOne({
            user: iUserID,
            _id: iIntentID
        }, function (err, iIntent) {
            if (err) {
                iCallback(err, null);
            } else if (iIntent != undefined) {
                iCallback(null, iIntent);
            } else {
                iCallback(err, null);
            }
        });
    }
    updateAction(iIntentID, iIntentAction, iCallback) {
        if (iIntentAction != undefined && iIntentAction != "") {
            Intent.findOne({ _id: iIntentID }, function (err, iIntent) {
                if (err) {
                    iCallback(err, null);
                } else if (iIntent != undefined) {
                    iIntent.intentAction = iIntentAction;
                    iIntent.save(function (err) {
                        if (err) {
                            console.log("Intenet is not saved successfully" + err);
                            iCallback(err, null);
                        } else {
                            iCallback(null, iIntent);
                        }
                    });
                } else {
                    iCallback("No intent found", null);
                }
            });
        } else {
            iCallback("Add a valid intent action", null);
        }
    }

};

const manager = new IntentManager();

module.exports = manager;