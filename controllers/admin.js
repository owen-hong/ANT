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