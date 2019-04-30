const express = require('express');
const router = express.Router();
const passport = require('passport');
const Intent = require('../models/intent');

const initMachineLearning = function (iUser) {
    Intent.find({
        user: iUser._id
    }, function (err, iIntents) {
        if (err) {
            console.log("database giving problem on first intent")
        } else if (iIntents.length > 0) {
            iIntents.forEach(function (iIntent) {
                iIntent.expressions.forEach(function (iExpression) {
                    NLP.addClassifiedData(iExpression, iIntent.key);
                });
            })
        } else {
            var intent = new Intent({
                user: iUser._id,
                key: "createKitchen",
                value: "Create Kitchen",
                expressions: ["I want to create kitchen"],
                responses: []
            });
            intent.save(function (err) {
                if (err) {
                    console.log("Intenet is not saved successfully" + err);
                } else {
                    NLP.addClassifiedData(intent.expressions[0], intent.key);
                }
            });
        }
    });
}

var createWSServiceURL = function (iUserID, iLoginResponse) {
    const exec = require('child_process').execSync;
    iLoginResponse.isUserLoggedIn = true;
    iLoginResponse.webservice = "http://";
    if (process.env.NODE_ENV === "production") {
        if (process.env.HOST_NAME != undefined && process.env.HOST_NAME != "") {
            iLoginResponse.webservice += process.env.HOST_NAME;
        }
        if (process.env.DNS_DOMAINNAME != undefined && process.env.DNS_DOMAINNAME != "") {
            iLoginResponse.webservice += process.env.DNS_DOMAINNAME;
        }
        iLoginResponse.webservice += ":97";
    } else {
        try {
            let hostname = Buffer.from(exec("hostname")).toString('utf8');
            iLoginResponse.webservice += hostname;
        } catch (err) {
            console.log("no hostname");
        }
        iLoginResponse.webservice += ":9999";
    }
    iLoginResponse.webservice += "/webservice/getresponse/" + iUserID;
}


var isLoggedIn = function (req, res, next) {
    let loginResponse = {
        isUserLoggedIn: false,
        webservice: ""
    }
    if (req.isAuthenticated()) {
        initMachineLearning(req.user);
        createWSServiceURL(req.user._id, loginResponse);
        res.json(loginResponse);
    } else {
        res.json(loginResponse);
    }
}

router.post('/login', passport.authenticate('local-login'), isLoggedIn);

router.post('/signup', passport.authenticate('local-signup'), isLoggedIn);

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).redirect('/');
});

module.exports = router;