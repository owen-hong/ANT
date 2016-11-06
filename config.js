/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

//配置文件
var config = {
    port: 3000,
    debug: false,
    rdCookieTime: new Date(Date.now() + 900000), //cookie的有效期为900000ms
    db:'mongodb://127.0.0.1/ANT',
    session_secret:'owenhong',
    redis_port:'6379',
    redis_host:'127.0.0.1'
}

module.exports = config;