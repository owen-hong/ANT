/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var mongoose = require('mongoose');
var config   = require('../config');
var logger = require('../common/logger');

mongoose.Promise = require('bluebird'); //��ֹES6�﷨���־���
mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    console.log('mongodb connect success...');

});

// models
require('./user');
require('./adminUser');
require('./article');
require('./links');
require('./loan');
require('./home');

exports.User = mongoose.model('User');
exports.adminUser = mongoose.model('adminUser');
exports.Article = mongoose.model('article');
exports.Links = mongoose.model('Links');
exports.Loan = mongoose.model('Loan');
exports.Home = mongoose.model('Home');
