var debug        = require('debug')('wptc:app');
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//route methods
var home         = require('./routes/home');
var suite        = require('./routes/suite');
var apiproxy     = require('./routes/apiproxy');


var app = express();

// if you want authentication, uncomment this section
// and `npm install --save basic-auth`
// var basicAuth = require('basic-auth');
//
// checkAuth = function(username, password) {
//   return function(req, res, next) {
//     var user = basicAuth(req);
//
//     if (!user || user.name !== username || user.pass !== password) {
//       res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//       return res.send(401);
//     }
//
//     next();
//   };
// };
//
// // change these...
// app.use(checkAuth('a-username', 'a-password'));
// end auth section


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//route mapping
app.use('/', home);
app.use('/suite', suite);
app.use('/apiproxy', apiproxy);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
