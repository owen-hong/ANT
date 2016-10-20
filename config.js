/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

//常用配置文件
var config = {
    port: 3000,
    debug: false,
    db:'mongodb://127.0.0.1/ANT',
    session_secret:'owenhong',
    redis_port:'6379',
    redis_host:'127.0.0.1'
}

module.exports = config;