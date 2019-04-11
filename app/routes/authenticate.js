const express = require('express');
const router = express.Router();
const passport = require('passport');
const Intent = require('../models/intent');

const initMachineLearning = function (iUser) {
    Intent.find({user: iUser._id},function (err, iIntents) {
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


var isLoggedIn = function (req, res, next) {
    let loginResponse = {
        isUserLoggedIn: false,
        webservice: ""
    }
    if (req.isAuthenticated()) {
        initMachineLearning(req.user);
        loginResponse.isUserLoggedIn = true;
        loginResponse.webservice = "http://nkr4w10plp:97/api/getresponsewebservice/"+req.user._id;
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