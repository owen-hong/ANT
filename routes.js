/**
 * Created by owenhong on 2015/11/10.
 */

var Home = require('./controllers/index');
var Passport = require('./controllers/passport');


exports.handle = function (app) {
    //index
    app.get('/', Home.index);
    app.get('/newUser', Home.registerUser);


    app.get('/login', Passport.login);

    app.get('/loginSuccess', Passport.loginSuccess);
    app.post('/doLogin', Passport.doLogin);


    app.get('/code', Home.code);














}







