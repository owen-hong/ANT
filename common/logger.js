/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var config = require('../config');

var env = process.env.NODE_ENV || "development"


var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: 'file',
            filename: 'logs/cheese.log',
            category: 'cheese'
        }
    ],
    //以[INFO] console代替console默认样式
    replaceConsole: true
});

var logger = log4js.getLogger('cheese');
logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;