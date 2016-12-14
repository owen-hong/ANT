var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ueditor = require("ueditor")
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
app.use(bodyParser.urlencoded({ extended: true }));

//TODO parse application/json
app.use(bodyParser.json());

//TODO 4.0 method-override
app.use(methodOverride());


//ueditor
app.use("/admin/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

    console.log('req.query.action.......');
    console.log(req.query);

    // ueditor 客户发起上传图片请求
    if(req.query.action === 'uploadimage'){

        // 这里你可以获得上传图片的信息
        var foo = req.ueditor;
        console.log(foo.filename); // exp.png
        console.log(foo.encoding); // 7bit
        console.log(foo.mimetype); // image/png

        // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
        var img_url = 'uploads';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
        var dir_url = 'uploads'; // 要展示给客户端的文件夹路径
        res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片

        console.log()
    }
    // 客户端发起其它请求
    else {
        console.log('other');
        res.setHeader('Content-Type', 'application/json');
        // 这里填写 ueditor.config.json 这个文件的路径
        res.redirect('/admin/ueditor/ueditor.config.json')
    }
}));


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


if (!config.debug) {

    // 视图缓存
    //app.set('view cache', true);
}


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