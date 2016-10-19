/**
 * Created by owenhong on 2015/11/10.
 */

var Home = require('./controllers/index');


exports.handle = function (app) {
    //index
    app.get('/', Home.index);
    app.get('/newUser', Home.registerUser);



    app.get('/login', Home.login);
    app.get('/admin/login', Home.loginSuccess);

    app.post('/doLogin', Home.doLogin);





















}







