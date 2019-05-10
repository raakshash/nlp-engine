var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var session = require('express-session');
const nlp = require('./nltk/natural');
const ML = require('./config/machinelearning');

global.NLP = nlp;

require("./config/database.js").init();
require('./config/passport.js').init(passport);

// var indexRouter = require('./app/routes/index');
const apiRouter = require('./routes/api');
const authenticateRouter = require('./routes/authenticate');
const webserviceRouter = require('./routes/webservice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// required for passport
app.use(session({
  secret: 'raakshash', // session secrets
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/authenticate', authenticateRouter);
app.use('/webservice', webserviceRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

ML.init();

module.exports = app;
