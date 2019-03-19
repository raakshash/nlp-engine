var express = require('express');
var router = express.Router();
const passport = require('passport');

var nlp = require('../nltk/natural.js');

var result = null;
var classifiedValue = null;
var isSignupModeActive = false;

var isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.status(400).redirect('/');
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Numenedict',
    isSignupActive: isSignupModeActive
  });
});

router.get('/create-model', isLoggedIn, function (req, res) {
  res.render('main', { 
    title: 'Numenedict',
    result: result,
    classified: classifiedValue
  });
  classifiedValue = null;
});

router.get('/login', function(req, res, next){
  isSignupModeActive = false;
  res.redirect('/');
});
router.get('/signup', function(req, res, next){
  isSignupModeActive = true;
  res.redirect('/');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/create-model',
  failureRedirect: '/'
}));

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/create-model',
  failureRedirect: '/'
}));

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.status(200).redirect('/');
});

router.post('/checkcontents', function (req, res, next) {
  var expression = req.body.expression;
  if (expression != undefined) {
    nlp.getExpressionData(expression, function (iResults) {
      result = iResults;
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

router.post('/addClassifiedData', function (req, res, next) {
  let expression = req.body.expression;
  let entity = req.body.entity;
  if (expression != undefined && entity != undefined) {
    nlp.addClassifiedData(expression, entity);
  }
  res.redirect('/');
});

router.get('/train', function (req, res, next) {
  nlp.trainYourBot();
  res.redirect('/');
});

router.post('/getClassifiedData', function (req, res, next) {
  let expression = req.body.expression;
  try{
    classifiedValue = nlp.getClassifiedData(expression);
  }catch(e){
    classifiedValue = "Not trained";
  }
  res.redirect('/');
});

module.exports = router;