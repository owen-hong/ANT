/**
 * Created by owenhong on 2016/10/24.
 */


var User = require('../proxy/user.js');

exports.index = function(req,res){

    User.findAll(function(err,data){
        res.render('admin/index',{
            title:'登录成功',
            userName:'owenhogn',
            posts:data
        });
    });

}




exports.addAdminUser = function(req,res){
    res.render('admin/addAdminUser',{
        title:'添加渠道商',
    });
};

exports.doAddAdminUser = function(req,res){
    console.log(req.body.userName);
    console.log(req.body.channelId);
    console.log(req.body.password);

    res.end();
};

exports.login = function(req,res){
    res.render('admin/login',{
        title:'登录',
    });

}
exports.doLogin = function(req,res){
    res.render('admin/login',{
        title:'登录',
    });

}



exports.loginOutTest = function(req,res){
    req.session.user = null;
    res.send(req.session.user);
}
