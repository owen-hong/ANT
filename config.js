/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

//配置文件
var config = {
    port: 3000,
    debug: false,
    rdCookieTime: new Date(Date.now() + 2592000000), //cookie的有效期为2592000000ms约30天
    db:'mongodb://127.0.0.1:27028/ANT',
    session_secret:'owenhong',
    redis_port:'6379',
    redis_host:'127.0.0.1',
    listRows:10,
    smsValidTime:3000, //设置验证码有效时间
    smsAppkey:'23516126',
    smsAppsecret:'5116deb101854474eb2360695e008455',
    smsTemplateCode:'SMS_25165288'
}

module.exports = config;