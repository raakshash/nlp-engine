var express = require('express');
var router = express.Router();

var nlp = require('../nltk/natural.js');

var result = {};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Numenedict',
    result: JSON.stringify(result)
  });
});

router.post('/stemmer', function (req, res, next) {
  var string = req.body.string;
  result = nlp.getStemming(string);
  res.redirect('/');
});

router.post('/stringdistance', function (req, res, next) {
  var string1 = req.body.stringdistance1;
  var string2 = req.body.stringdistance2;
  result = nlp.getStringDistance(string1, string2);
  res.redirect('/');
});


router.post('/tokenize', function (req, res, next) {
  var string = req.body.string;
  result = nlp.getTockenize(string);
  res.redirect('/');
});

router.post('/classifier', function (req, res, next) {
  var string = req.body.string;
  result = nlp.getClassified(string);
  res.redirect('/');
});

router.post('/sentiments', function (req, res, next) {
  var string = req.body.string;
  result = nlp.getSentiments(string);
  res.redirect('/');
});
module.exports = router;