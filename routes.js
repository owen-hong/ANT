/**
 * Created by owenhong on 2015/11/10.
 */

var Home = require('./controllers/index');
var Admin = require('./controllers/admin');
var Passport = require('./controllers/passport');


exports.handle = function (app) {


    /**
     * index start...
     */

    //index
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

    //添加渠道管理员
    app.get('/admin/addAdminUser', Admin.adminIsLoggedIn, Admin.addAdminUser);
    app.post('/admin/doAddAdminUser', Admin.adminIsLoggedIn, Admin.doAddAdminUser);







}







