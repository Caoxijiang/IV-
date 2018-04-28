var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser)
var session = require('express-session'); 
var index = require('./routes/index');
var sms = require('./routes/sms');
var weixin= require('./routes/weixin');
var wx_Pay=require('./routes/wxPay');
var orders=require('./routes/orders');
var imageserver=require('./imageserver/imageserver');
var image=require('./routes/image');
//var ejs=require('ejs');
var swig=require('swig');
var adminligin=require('./routes/adminlogin');

//var redis=require("./Redis/RedisServer");
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB 
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes 
    normalizeTags: true, // Transform tags to lowercase 
    explicitArray: false // Only put nodes in array if >1 
  }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',swig.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser('sessiontest'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

// app.use(function (req, res, next) {
//   var url = req.originalUrl;
//   if (url != "/" && !req.session.user) {
//       return res.redirect("/");
//   }
//   next();
// });

app.use(session({
  secret:"caoxijiang",
  cookie:{
    maxAge:10000*60
  },
  resave:true,
  saveUninitialized:true
  
}));




app.use('/',adminligin);
app.use('/index', index);
app.use('/sms', sms);
app.use('/weixin',weixin);
app.use('/wxPay',wx_Pay);
app.use('/orders',orders);
//app.use("./imageserver/imageserver",imageserver);
app.use('/image',image);


//app.use('/redis',redis);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
