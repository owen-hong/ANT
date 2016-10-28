/**
 * Created by owenhong on 2016/10/20.
 */

var TopClient = require('ali-top-sdk').TopClient;
var Redis = require('ioredis');
var redis = new Redis();

exports.sendCode = function(Config,callback){
    //生成4位数字的随机数
    var code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);

    var tel = Config.phone;
    var param = '{\"name\":\"欧文\",\"code\":\"'+ code +'\",\"time\":\"1\"}';
    var validTime = 60;
    var phoneId = "register:" + tel;

    var client = new TopClient({
        'appkey': '23488432',
        'appsecret':'e3e204fb11edb3afa5bc4392ee0796c6',
        'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });

    redis.get(phoneId, function (err, resultCode) {
        if(err){
            callback({
                success:false,
                repeat:false,
                message:err.message
            });
        }
        if(resultCode){
            callback({
                success:false,
                repeat:true,
                message:'1分钟内请勿重复发送验证码'
            });
        }else{
            client.execute('alibaba.aliqin.fc.sms.num.send', {
                'extend': '123456',
                'sms_type': 'normal',
                'sms_free_sign_name':'520UED前端',
                'sms_param': param,
                'rec_num': tel,
                'sms_template_code': 'SMS_19565021'
            }, function (error, response) {
                console.log(error);
                console.log(response);
                if (error) {
                    callback({
                        success:false,
                        repeat:false,
                        message:'系统错误请稍后重试'
                    });
                } else {
                    if(response.result.success){
                        redis.multi()
                            //限制访问频率60秒
                            .set(phoneId, code)
                            .expire(phoneId, validTime)
                            .exec(function (err, results) {
                                if (err) {
                                    callback({
                                        success:false,
                                        repeat:false,
                                        message:err.message
                                    });
                                }else{
                                    console.log('ok');
                                    callback({
                                        success:true,
                                        message:'发送成功...'
                                    });
                                }
                            });
                    }else{
                        callback({
                            success:false,
                            repeat:false,
                            message:response.result.msg
                        });
                    }
                }
            });
        }
    });
}


