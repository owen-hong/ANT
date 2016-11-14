/**
 * Created by owenhong on 2016/10/19.
 */

var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../proxy/user.js');

////登录模块
passport.use('local',
    new LocalStrategy(function (username, password, done) {
        console.log('user');
        console.log(username);
        console.log(password);

        var md5 = crypto.createHash('md5');
        var Pass = md5.update(password).digest('base64');

        User.findPhone(username,function(err,posts){
            if (err) { return done(err); }

            if (!posts) {
                console.log('Incorrect username');
                return done(null, false);
            }


            if (Pass !== posts.password) {
                console.log('Incorrect password');
                return done(null, false);
            }

            return done(null, posts.phone);

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
exports.doLogin = passport.authenticate('local',{
    successRedirect: '/loginSuccess',
    failureRedirect: '/login'
});


exports.login = function(req, res) {
    console.log('login in');
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

        console.log('已登录...');
        console.log(req.user);


        return next();
    }else{
        res.redirect('/login');
    }
}


var AliSms = require('./sms.js');
//验证码
exports.authCode = function(req, res) {
    var regx = /^(13|15|17|18|14)[0-9]{9}$/;
    var phone = req.query.phone;

    if(phone.match(regx)){

        User.findPhone(phone,function(err,results) {
            if(err){
                res.json({
                    success:false,
                    message:'验证码系统开小差啦，请稍后重试'
                });
                return false;
            }

            if(results == "" || results == null){
                var config = {
                    phone:phone
                }
                AliSms.sendCode(config,function(data){
                    console.log(data);

                    if(data.success === true && data.repeat === false){
                        res.json({
                            success:true,
                            message:'发送成功'
                        })
                    }else if(data.repeat === true){
                        res.json({
                            success:false,
                            message:'一分钟内请勿重复发送验证码'
                        })
                    }else{
                        res.json({
                            success:false,
                            message:'验证码系统开小差啦，请稍后重试'
                        })
                    }
                });
            }else{
                res.json({
                    success:false,
                    message:'该手机号码已被注册'
                });
            }
        });
    }else{
        console.log("no");
        res.json({
            success:false,
            message:'请填写正确的手机号码!!'
        })
    }
}


