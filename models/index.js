/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var mongoose = require('mongoose');
var config   = require('../config');
var logger = require('../common/logger');

mongoose.Promise = require('bluebird'); //防止ES6语法出现警告
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

exports.User = mongoose.model('User');
