/**
 * Created by owenhong on 2015/11/10.
 */

var Home = require('./controllers/index');
var Admin = require('./controllers/admin');
var Passport = require('./controllers/passport');


exports.handle = function (app) {
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




    //admin
    app.get('/admin', Admin.index);
    app.get('/admin/login', Admin.login);


    app.get('/admin/addAdminUser', Admin.addAdminUser);
    app.post('/admin/doAddAdminUser', Admin.doAddAdminUser);







}







