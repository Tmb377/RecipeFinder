var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var LocalStragegy = require('passport-local');

var routes = require('./routes/index');
var users = require('./routes/users');

var flash = require('connect-flash');



var app = express();

//var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var sessionOptions = {
  secret: 'recipe user',
  saveUninitialized: false,
  resave: false
};

app.use(session(sessionOptions));


var User = mongoose.model('User');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStragegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine('handlebars', handlebars.engine);
app.use(express.static('public'));
app.use(express.static('views'));



// view engine setup

app.set('view engine', 'hbs');
app.set('view options', {layout: '/layouts/main'});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('cookie'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());



//passport configuration from mherman.org (from class notes)
var User = mongoose.model('User');
passport.use(new LocalStragegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', routes);
app.use('/users', users);

app.use(flash());



//check if user is logged in, if not, redirect to homepage
app.use(function(req, res, next){
  if(req.user != null){
    
  
  }
  else{
    res.redirect('/');

  }
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

var debug = require('debug')('recipeFinder:server');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);

io.on('connection', function(socket){

  socket.on('favclick', function(recid){
    console.log(recid);
  });
});


