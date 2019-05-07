const express = require('express');
const router = express.Router();
const passport = require('passport');
const ML = require('../config/machinelearning');

var createWSServiceURL = function (iUserID, iLoginResponse) {
    const exec = require('child_process').execSync;
    iLoginResponse.isUserLoggedIn = true;
    iLoginResponse.webservice = "http://";
    if (process.env.NODE_ENV === "production") {
        if (process.env.HOST_NAME != undefined && process.env.HOST_NAME != "") {
            iLoginResponse.webservice += process.env.HOST_NAME;
        }
        if (process.env.DNS_DOMAINNAME != undefined && process.env.DNS_DOMAINNAME != "") {
            iLoginResponse.webservice += '.';
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
        ML.init(req.user);
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