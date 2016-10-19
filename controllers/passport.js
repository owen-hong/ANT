/**
 * Created by owenhong on 2016/10/19.
 */

'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


var User = require('../proxy/user.js');



//��¼ģ��
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

//����user����
passport.serializeUser(function (user, done) {
    done(null, user);//����ͨ�����ݿⷽʽ����
});

//ɾ��user����
passport.deserializeUser(function (user, done) {
    done(null, user);//����ͨ�����ݿⷽʽ����
});



//��¼����ת
exports.doLogin = passport.authenticate('local', {
    successRedirect: '/admin/login',
    failureRedirect: '/login',
    failureFlash: true
});

exports.login = function(req, res) {
    res.render('login',{
        title:'��¼'
    });
};


exports.loginSuccess = function(req, res) {
    res.render('index',{
        title:'��¼�ɹ�'
    });
})



//�˳�
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/admin/login');
};

//��֤�Ƿ��ѵ�¼,��¼ֱ����ת��admin��ҳ
exports.checkNotLogin = function(req,res,next){
    if(req.isAuthenticated()){
        req.flash('error','�ѵ�¼');
        return res.redirect('/admin');
    }
    next();
}

//��֤�Ƿ��¼
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








