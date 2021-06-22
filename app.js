require('./database/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
require('dotenv').config();
var router = require('./routes/index');
var userRouter = require('./controllers/userController');
var dashboard = require('./controllers/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
// app.use('/css', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/css'))
// app.use('/webfonts', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/webfonts'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/adminlte/dist', express.static(__dirname + '/node_modules/admin-lte/dist'))
app.use('/adminlte/plugins', express.static(__dirname + '/node_modules/admin-lte/plugins'))
app.use('/', router);
app.use('/', userRouter);
app.use('/', dashboard);

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
