const Response = require('../models/response');


class ResponseManager {
    constructor() { }

    addResponse(iIntentID, iResponse, iCallback) {
        if (iResponse != undefined && iResponse != "") {
            let newResponse = new Response();
            newResponse.intentID = iIntentID;
            newResponse.value = iResponse;
            newResponse.save(function (err) {
                if (err) {
                    iCallback(err);
                } else {
                    iCallback(null);
                }
            });
        } else {
            res.json("Please add a valid response", null);
        }
    }
    deleteOneResponse(iResponseID, iCallback) {
        Response.deleteOne({ _id: iResponseID }, function (err) {
            iCallback(err);
        });
    }

    deleteAllIntentResponse(iIntentID, iCallback) {
        Response.deleteMany({ intentID: iIntentID }, function (err) {
            iCallback(err);
        })
    }

    findAllResponses(iIntentID, iCallback) {
        Response.find({ intentID: iIntentID }, function (err, iResponses) {
            if (err) {
                console.log("No intent found: " + err);
                iCallback(err, null);
            } else if (iResponses) {
                iCallback(null, iResponses);
            } else {
                console.log("No intent found: " + err);
                iCallback(err, null);
            }
        });
    }
};

const manager = new ResponseManager();

module.exports =  manager;