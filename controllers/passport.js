/**
 * Created by owenhong on 2016/10/19.
 */

'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


var User = require('../proxy/user.js');



//登录模块
passport.use('local', new LocalStrategy(
    function (username, password, done) {

        var Pass = password;

        console.log('Pass');
        console.log(username);
        console.log(Pass);


        User.findOne(username,function(err,posts){

            if(err){
                return res.send(err);
            }

            if(posts=="" || posts==null){
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (Pass !== posts.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, posts.username);

        });
    }
));

//保存user对象
passport.serializeUser(function (user, done) {
    done(null, user);//可以通过数据库方式操作
});

//删除user对象
passport.deserializeUser(function (user, done) {
    done(null, user);//可以通过数据库方式操作
});



//登录后跳转
exports.doLogin = passport.authenticate('local', {
    successRedirect: '/admin/login',
    failureRedirect: '/login',
    failureFlash: true
});

exports.login = function(req, res) {
    res.render('login',{
        title:'登录'
    });
};


exports.loginSuccess = function(req, res) {
    res.render('index',{
        title:'登录成功'
    });
})



//退出
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/admin/login');
};

//验证是否已登录,登录直接跳转到admin首页
exports.checkNotLogin = function(req,res,next){
    if(req.isAuthenticated()){
        req.flash('error','已登录');
        return res.redirect('/admin');
    }
    next();
}

//验证是否登录
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        Passport.findUser(req.user,function(err,data){
            if(err){
                return res.send(err);
            }

            req.session.icon = data.icon;
            req.session.userId = data._id;
            req.session.userName = data.username;
        });

        return next();
    }else{
        res.redirect('/admin/login');
    }
}








