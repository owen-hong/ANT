/**
 * Created by owenhong on 2016/10/19.
 */

'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../proxy/user.js');



//登录模块
passport.use('local', new LocalStrategy(
    function (username, password, done) {
        console.log('user');
        console.log(username);
        console.log(password);

        User.findOne(username,function(err,posts){
            if (err) { return done(err); }

            if (!posts[0]) {
                console.log('Incorrect username');
                return done(null, false);
            }

            if (password !== posts[0].password) {
                console.log('Incorrect password');
                return done(null, false);
            }

            console.log('result::');
            console.log(posts[0].phone);

            return done(null, posts[0].phone);

        });
    }
));


//保存user对象
passport.serializeUser(function (user, done) {
    console.log('serializeUser');
    console.log(user);
    done(null, user);//可以通过数据库方式操作
});

//删除user对象
passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    console.log(user);
    done(null, user);//可以通过数据库方式操作
});



//登录后跳转
exports.doLogin = passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/login'
});



exports.login = function(req, res) {

    console.log('login');
    console.log(req.isAuthenticated());

    res.render('login',{
        title:'登录'
    });
};


exports.loginSuccess = function(req, res) {
    console.log('loginSuccess');
    console.log(req.isAuthenticated());
    res.render('index',{
        title:'登录成功'
    });
};



//退出
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};

//验证是否已登录,登录直接跳转到admin首页
exports.checkNotLogin = function(req,res,next){
    if(req.isAuthenticated()){
        console.log('已登录');
        return res.redirect('/admin/login');
    }
    next();
}

//验证是否登录
exports.isLoggedIn = function(req, res, next) {

    console.log('req.isAuthenticated');
    console.log(req.isAuthenticated());

    if (req.isAuthenticated()){
        Passport.findOne(req.user,function(err,data){
            if(err){
                return res.send(err);
            }

            console.log(data);
        });

        return next();
    }else{
        res.redirect('/login');
    }
}








