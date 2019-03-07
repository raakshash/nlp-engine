var express = require('express');
var router = express.Router();

var nlp = require('../nltk/natural.js');

var result = null;
var classifiedValue = null;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Numenedict',
    result: result,
    classified: classifiedValue
  });
  classifiedValue = null;
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