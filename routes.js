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



    app.get('/register', Home.registerUser);
    app.post('/doRegister', Home.doRegisterUser);

    app.get('/loginSuccess', Passport.isLoggedIn,Passport.loginSuccess);


    app.post('/doLogin', Passport.doLogin);

    //app.get('/code', Home.code);






    app.get('/admin', Admin.index);







}







