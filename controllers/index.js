/**
 * Created by owenhong on 2016/10/9.
 *
 * domain：cookie在什么域名下有效，类型为String,。默认为网站域名
 * expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
 * httpOnly: 只能被web server访问，类型Boolean。
 * maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
 * path: cookie在什么路径下有效，默认为'/'，类型为String
 * secure：只能被HTTPS使用，类型Boolean，默认为false
 * signed:使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`
 */


'use strict';
var config   = require('../config.js');
var request = require('request');
var crypto = require('crypto');
var Redis = require('ioredis');
var Article = require('../proxy/article.js');
var Links = require('../proxy/links.js');
var redis = new Redis();

var User = require('../proxy/user.js');


//公共头尾数据输出
exports.global = function (req, res, next) {
    //友情链接数据输出
    Links.findAll(function (err, Ldata) {
        if (err) {
            return res.send(err);
        }
        res.locals.LinkPosts = Ldata;

        next();
    });
}


exports.index = function(req,res){
    res.render('index',{
        title:'',
    });
};


exports.code = function(req,res){
    var tel = '18820183227';

    redis.get("register:" + tel).then(function (result) {
        console.log(result);
        res.send(result)
    }).catch(function(e){
        console.log('err');
        console.log(e);
    })

}

exports.registerUser = function(req,res){
    var channelId = req.query.channelId || 'ANT-User';

    //判断渠道商RD是否有效
    //if(req.cookies.channelId){
    //    channelId = req.cookies.channelId;
    //    console.log('yes');
    //    console.log(channelId);
    //}
    //if(req.query.channelId){
    //    console.log('no');
    //    res.cookie('channelId', channelId, {
    //        path: '/register',
    //        expires: config.rdCookieTime , //cookie的有效期为900000ms
    //        signed:true
    //    });
    //}

    res.render('registerUser',{
        title:'注册用户',
        channelId:channelId
    });
}

exports.doRegisterUser = function(req,res){
    var md5 = crypto.createHash('md5');

    var phone = req.body.phone.trim();
    var password = req.body.password.trim();
    var authCode = req.body.authCode.trim();

    var regx = /^(13|15|17|18|14)[0-9]{9}$/;
    var passwordRegx = /^(\w){6,20}$/;
    var authCodeRegx =/^[0-9]{4}$/;


    if(!phone.match(regx)){
        res.json({
            status:false,
            message:'请填写正确的手机号码'
        });
        return false;
    }
    if(!password.match(passwordRegx)){
        res.json({
            status:false,
            message:'请输入6-20个字母、数字、下划线密码'
        });
        return false;
    }
    if(!authCode.match(authCodeRegx)){
        res.json({
            status:false,
            message:'验证码错误'
        });
        return false;
    }


    //校验验证码
    var phoneId = "register:" + phone;
    redis.get(phoneId, function (err, resultCode) {
        if (err) {
            res.json({
                status:false,
                message:'系统开小差啦，请稍后重试'
            });
            return false;
        }

        //检验验证码是否正确
        if(resultCode !== authCode){
            res.json({
                status:false,
                message:'验证码错误，请输入正确的验证码'
            });
            return false;
        }

        User.findPhone(phone,function(err,results){
            if(err){
                res.json({
                    success:false,
                    message:'验证码系统开小差啦，请稍后重试'
                });
                return false;
            }

            console.log(err);
            console.log(results);

            if(results == "" || results == null){
                var name = req.body.name ||'Ant-Man';
                var phone = req.body.phone;
                var password = md5.update(req.body.password).digest('base64');
                var activeType = req.body.activeType || 'ANT';
                var channelId = req.body.channelId || 'ANT-User';

                var userData = {
                    name: name ,
                    phone: phone,
                    password: password,
                    activeType: activeType,
                    channelId: channelId,
                    //weight: '0'
                };
                console.log(userData);

                User.newAndSave(userData,function(err,data){
                    if(err){
                        console.log(err);
                        res.json({
                            status:false,
                            message:err.message
                        });
                        return;
                    }
                    console.log('success...');
                    res.json({
                        status:true,
                        message:'注册成功'
                    });
                });
            }else{
                res.json({
                    success:false,
                    message:'该手机号码已被注册'
                });
            }
        });
    });
};


//文章列表
exports.articleList = function (req, res) {
    Article.findCount(function (err, count) {
        if (err) {
            return res.send(err);
        }

        //每页展示数量
        var listRows = 10;
        var maxPage = Math.ceil(count / listRows);

        var $page = req.query.page ? req.query.page : 1;
        var currentPage = $page <= 0 ? 1 : $page;

        console.log(currentPage);

        //数据开始位置
        var start = (currentPage - 1) * listRows;

        //查询
        var fields = 'title created updated author classify clickCount top';

        Article.findAll(fields, start, listRows, function (err, posts) {
            if (err) {
                return res.send(err);
            }
            if (posts == "") {
                res.render('news_list', {
                    title: '文章列表',
                    nullTip: '暂无数据！',
                    posts: ""
                });
            } else {
                res.render('news_list', {
                    title: '文章列表',
                    currentPage: currentPage,
                    maxPage: maxPage,
                    posts: posts,
                    nullTip: ""
                });
            }
        });
    });
};

//文章详情
exports.articleDetails = function (req, res) {
    Article.findOne(req.params.id, function (err, persons) {
        if (err) {
            return res.send(err);
        }

        res.render('news_content', {
            title: '文章详情',
            posts: persons,
        });

    });
}