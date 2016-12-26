/**
 * Created by owenhong on 2015/11/10.
 */

var Home = require('./controllers/index');
var Admin = require('./controllers/admin');
var Passport = require('./controllers/passport');
var Article = require('./controllers/article');
var Loan = require('./controllers/loan');


exports.handle = function (app) {


    /**
     * index start...
     */

    app.get('*', Home.global);

    ////index
    app.get('/', Home.index);

    app.get('/isLoggedIn', Passport.isLoggedIn);
    app.get('/login', Passport.login);
    app.get('/logout', Passport.logout);

    //发送验证码
    app.get('/authCode', Passport.authCode);


    app.get('/register', Home.registerUser);
    app.post('/doRegister', Home.doRegisterUser);

    app.get('/loginSuccess', Passport.isLoggedIn,Passport.loginSuccess);

    app.post('/doLogin', Passport.doLogin);


    app.get('/newsList', Home.articleList);
    app.get('/articleDetails/:id', Home.articleDetails);




    /**
     * admin start...
     */

    //admin
    app.get('/admin', Admin.adminIsLoggedIn, Admin.index);


    //退出后台
    app.get('/admin/adminLoginOut', Admin.adminLoginOut);


    //后台登录
    app.get('/admin/AdminUserLogin', Admin.AdminUserLogin);
    app.post('/admin/doAdminUserLogin', Admin.doAdminUserLogin);


    //所有注册用户列表
    app.get('/admin/userList', Admin.adminIsLoggedIn, Admin.userList);

    //渠道商业绩列表
    app.get('/admin/adminChannelList', Admin.adminIsLoggedIn, Admin.adminChannelList);



    //渠道管理员列表
    app.get('/admin/adminUserList', Admin.adminIsLoggedIn, Admin.adminUserList);
    app.get('/admin/deleteAdminUser', Admin.adminIsLoggedIn, Admin.deleteAdminUser);



    //添加渠道管理员
    app.get('/admin/addAdminUser', Admin.adminIsLoggedIn, Admin.addAdminUser);
    app.post('/admin/doAddAdminUser', Admin.adminIsLoggedIn, Admin.doAddAdminUser);


    //文章列表
    app.get('/admin/article', Admin.adminIsLoggedIn,Article.article);

    //添加文章
    app.get('/admin/add', Admin.adminIsLoggedIn, Article.addArt);
    app.post('/admin/artPost', Admin.adminIsLoggedIn, Article.doArtPost);

    //编辑文章
    app.get('/admin/editArt', Admin.adminIsLoggedIn, Article.editArt);

    //更新文章
    app.post('/admin/editUpdate', Admin.adminIsLoggedIn, Article.doEditUpdate);

    //删除文章
    app.get('/admin/deletArt', Admin.adminIsLoggedIn, Article.deletArt);

    //置顶文章
    app.get('/admin/topArt', Admin.adminIsLoggedIn, Article.topArt);


    //上传图片
    app.get('/admin/file', Admin.adminIsLoggedIn, Article.file);
    app.post('/admin/doUpload', Admin.adminIsLoggedIn, Article.doUpload);

    //添加友情链接
    app.get('/admin/linkList', Admin.adminIsLoggedIn, Article.linkList);

    app.get('/admin/addLink', Admin.adminIsLoggedIn, Article.addLink);
    app.post('/admin/doAddLink', Admin.adminIsLoggedIn, Article.doAddLink);

    app.get('/admin/doRemoveLinks', Admin.adminIsLoggedIn, Article.doRemoveLinks);

    app.get('/admin/updateLinks', Admin.adminIsLoggedIn, Article.updateLink);
    app.post('/admin/doUpdateLinks', Admin.adminIsLoggedIn, Article.doUpdateLinks);

    //Loan
    //app.get('/admin/loanList', Admin.adminIsLoggedIn, Admin.loanList);
    //app.get('/admin/addLoan', Admin.adminIsLoggedIn, Admin.addLoan);
    //app.get('/admin/updateLoan', Admin.adminIsLoggedIn, Admin.updateLoan);
    //app.get('/admin/doRemoveLoan', Admin.adminIsLoggedIn, Admin.doRemoveLoan);
    //app.post('/admin/doAddLoan', Admin.adminIsLoggedIn, Admin.doAddLoan);
    //app.post('/admin/doUpdateLoan', Admin.adminIsLoggedIn, Admin.doUpdateLoan);
    //
    //app.get('/', Loan.loanList);


}







