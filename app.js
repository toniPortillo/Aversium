var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

let indexRouter = require('./router/index');
let usersRouter = require('./router/users');
let teamsRouter = require('./router/teams');

var app = express();

// settings
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
