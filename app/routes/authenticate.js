const express = require('express');
const router = express.Router();
const passport = require('passport');

var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.json(true);
    } else {
        res.json(false);
    }
}

router.post('/login', passport.authenticate('local-login'), isLoggedIn);

router.post('/signup', passport.authenticate('local-signup'), isLoggedIn);

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).redirect('/');
});

module.exports = router;