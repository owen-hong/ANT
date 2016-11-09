var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty');

//CSRF防攻击
var csurf = require('csurf');


var Routes = require('./routes.js');
var config   = require('./config.js');


var session = require('express-session');
var RedisStore = require('connect-redis')(session);

//登录模块
var passport = require('passport');

var app = express();






// view engine setup
app.set('views', path.join(__dirname, 'views'));

// 更改模板引擎
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


//TODO parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//TODO parse application/json
app.use(bodyParser.json());

//TODO 4.0 method-override
app.use(methodOverride());

//TODO connect-multiparty
app.use(multipart());


app.use(cookieParser(config.session_secret));


////设置全局时间控件
app.locals.moment = require('moment');


app.use(session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host
    }),
    resave: false,
    saveUninitialized: false
}));


//启动passport登录组件
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//开启csrf防攻击
app.use(csurf({ cookie: true }));

app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    res.locals.adminUserId = req.session.adminUserId;
    res.locals.adminUserName = req.session.adminUserName;
    res.locals.adminUserWeight = req.session.adminUserWeight;
    next();
});

//启动路由中心
Routes.handle(app);



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


/*
 *
 * 启动服务
 *
 * */


//设置端口
app.set('port', config.port);

app.listen(app.get('port'),function(){
  console.log('Node listening on port:' + app.get('port'));
}).on('error', function(err) {

  console.log(err);

});


//module.exports = app;