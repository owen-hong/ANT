/**
 * Created by owenhong on 2016/10/24.
 */

var crypto = require('crypto');
var config   = require('../config.js');
var User = require('../proxy/user.js');
var Loan = require('../proxy/loan.js');
var AdminUser = require('../proxy/adminUser.js');

var EditHome = require('../proxy/home.js');

exports.index = function(req,res){
    EditHome.findAll('', 0, 10, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        if (posts == "") {
            res.render('admin/edit-home', {
                title: '首页',
                homeId: '',
            });
        } else {
            if(posts[0].imgUrl == null){
                var bannerImg = [];
            }else{
                var bannerImg = posts[0].imgUrl.split(',');
            }

            res.render('admin/edit-home', {
                title: '首页',
                homeId: posts[0]._id,
                posts:posts[0],
                banner:bannerImg
            });
        }
    });
}


exports.doEditHome = function(req,res){
    var data = {
        title: req.body.title,
        keywords: req.body.keywords,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        company: req.body.company,
        about: req.body.about,
        qq:req.body.qq,
        phone:req.body.phone,
        email:req.body.email,
        wechat:req.body.wechat,
        address:req.body.address,
        copyright:req.body.copyright
    }


    if(req.body.homeId==""){
        //保存数据
        EditHome.newAndSave(data, function (err, posts) {
            if (err) {
                return res.send(err);
            }
            res.send("<h2>更新成功！两秒后回到首页！</h2><script>setTimeout(function(){window.location.href='/admin/';},2000);</script>");
        });
    }else{
        EditHome.updateById(req.body.homeId, data, function (err, posts) {
            if (err) {
                return res.send(err);
            }
            res.send("<h2>更新成功！两秒后回到首页！</h2><script>setTimeout(function(){window.location.href='/admin/';},2000);</script>");
        });
    }
}



exports.userList = function(req,res){
    User.findCount(function (err, count) {
        if (err) {
            return res.send(err);
        }

        //每页展示数量
        var listRows = config.listRows;
        var maxPage = Math.ceil(count / listRows);
        var currentPage = req.query.page === undefined ? 1 : req.query.page;
        currentPage = req.query.page == 0 ? 1 : currentPage;


        //数据开始位置
        var start = (currentPage - 1) * listRows;
        User.findAll(start, listRows, function (err, posts) {
            if (err) {
                return res.send(err);
            }

            //console.log(posts);
            if (posts == "") {
                res.render('admin/userList', {
                    title: '所有用户列表',
                    posts: ""
                });
            } else {
                res.render('admin/userList', {
                    title: '所有用户列表',
                    currentPage: currentPage,
                    maxPage: maxPage,
                    posts: posts
                });
            }
        });
    });
};


//添加渠道商业绩列表
exports.adminUserList = function(req,res){
    AdminUser.findAll(function(err,data){
        res.render('admin/adminUserList', {
            title: '渠道管理员列表',
            userName:req.session.adminUserName,
            posts: data
        });
    });

}
exports.deleteAdminUser = function(req,res){
    AdminUser.removeById(req.query.id,function(err,data){
        if (err) {
            return res.send(err);
        }

        res.redirect('/admin/adminUserList');
    });
}



exports.addAdminUser = function(req,res){
    res.render('admin/addAdminUser',{
        title:'添加渠道商',
    });
};

exports.doAddAdminUser = function(req,res){
    var md5 = crypto.createHash('md5');
    var userName = req.body.userName.trim();
    var channelId = req.body.channelId.trim();
    var password = md5.update(req.body.password).digest('base64');

    var paramData = {
        name:userName,
        password:password,
        channelId:channelId,
        weight: '2'
    };

    if(userName =="" || channelId=="" ||password==""){
        res.send('所有注册渠道商字段不能为空!');
        return false;
    }

    AdminUser.newAndSave(paramData,function(err,data){
        if(err){
            console.log(err);
            console.log(err.message);
            if(err.message.indexOf('E11000') >=0){
                res.send('渠道商ID重复，请重新设置!');
            }else{
                res.send('系统错误，请稍后重试!')
            }
            return false;
        }

        res.send("<h2>发布成功！两秒后回到首页！</h2><script>setTimeout(function(){window.location.href='/admin/adminUserList';},2000);</script>");
    });
};



//渠道商业绩查询
exports.adminChannelList = function(req,res){
    var adminUserId = req.session.adminUserId;
    User.findChannelCount(adminUserId,function (err, count) {
        if (err) {
            return res.send(err);
        }

        if(count == 0){
            res.render('admin/adminChannelList', {
                title: '业绩列表',
                userName:req.session.adminUserName,
                posts: ""
            });
            return false;
        }

        //每页展示数量
        var listRows = config.listRows;
        var maxPage = Math.ceil(count / listRows);
        var currentPage = req.query.page === undefined ? 1 : req.query.page;
        currentPage = req.query.page == 0 ? 1 : currentPage;

        //数据开始位置
        var start = (currentPage - 1) * listRows;
        User.findChannelAll(adminUserId,start, listRows, function (err, posts) {
            if (err) {
                return res.send(err);
            }

            //console.log(posts);
            if (posts == "") {
                res.render('admin/adminChannelList', {
                    title: '业绩列表',
                    posts: ""
                });
            } else {
                res.render('admin/adminChannelList', {
                    title: '业绩列表',
                    currentPage: currentPage,
                    maxPage: maxPage,
                    posts: posts
                });
            }
        });
    });
}

//登录验证
exports.adminIsLoggedIn = function(req,res,next){
    if(req.session.adminUserName){
        if(req.session.adminUserWeight == "2"){
            console.log('weight:2');
            if(req.url == '/admin/adminChannelList' || req.url == '/admin/adminChannelList/'){
                next();
            }else{
                res.redirect('/admin/adminChannelList');
            }
        }else{
            console.log('weight:0')
            next();
        }
    }else{
        res.redirect('/admin/AdminUserLogin');
    }


}





exports.AdminUserLogin = function(req,res){
    res.render('admin/login',{
        title:'登录',
    });


}
exports.doAdminUserLogin = function(req,res){
    var md5 = crypto.createHash('md5');
    var userName = req.body.username.trim();
    var password = md5.update(req.body.password).digest('base64');

    AdminUser.findChannelId(userName,function(err,posts){
        if(err){
            res.json({
                status:false,
                message:'系统错误，请稍后重试!'
            });
            return false;
        }
        if(posts.length > 0 ){
            if(posts[0].password == password){
                req.session.adminUserName = posts[0].name;
                req.session.adminUserId = posts[0].channelId;
                req.session.adminUserWeight = posts[0].weight;

                res.json({
                    status:true,
                    message:'登录成功'
                });
            }else{
                res.json({
                    status:false,
                    message:'登录失败，用户名密码错误!'
                });
            }
        }else{
            res.json({
                status:false,
                message:'登录失败，用户名密码错误!'
            });
        }
    });
}


exports.adminLoginOut = function(req,res){
    req.session.adminUserName = null;
    req.session.adminUserId = null;
    req.session.adminUserWeight = null;

    res.redirect('/admin/AdminUserLogin');
}



exports.loanList = function (req, res) {
    Loan.findAll(function (err, posts) {
        if (err) {
            return res.send(err);
        }

        res.render('admin/loanList', {
            title: '产品列表',
            posts: posts
        });
    });
}

exports.addLoan = function(req,res){
    res.render('admin/addLoan',{
        title:'添加产品',
        posts: '',
        update: false
    });
};
exports.doAddLoan = function (req, res) {
    var options = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        links: req.body.links,
        limit: req.body.limit,
        rate: req.body.rate,
        description: req.body.description
    };

    Loan.newAndSave(options, function (err, posts) {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.redirect('/admin/loanList');
    });
}
//删除友情链接
exports.doRemoveLoan = function (req, res) {
    Loan.removeById(req.query.id, function (err, posts) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.redirect('/admin/loanList');
    });
}
exports.updateLoan = function (req, res) {
    Loan.findOne(req.query.id, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        res.render('admin/addLoan', {
            title: '编辑产品',
            posts: posts,
            update: true
        });
    });
}
exports.doUpdateLoan = function (req, res) {
    var options = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        links: req.body.links,
        limit: req.body.limit,
        rate: req.body.rate,
        description: req.body.description
    };
    Loan.updateById(req.body.id, options, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/admin/loanList');
    });
}


