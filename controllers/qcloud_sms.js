/**
 * Created by owenhong on 2016/10/9.
 */

'use strict';
var request = require('request');
var md5 = require('md5');

exports.index = function(req,res){
    var app_key = '63a12654f0b4dca1912573fea8ce7126';
    var phone = '18820183227';

    var sig = md5(app_key + phone);

    //生成4位数字的随机数
    var code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);


    var formData = {
        "tel": {
            "nationcode": "86", //国家码
            "phone": "18820183227" //手机号码
        },
        "type": "0", //0:普通短信;1:营销短信（强调：要按需填值，不然会影响到业务的正常使用）
        "sign": "谢鸿飞", //短信签名，如果使用默认签名，则可以缺省此字段
        "tpl_id": 1072, //业务在控制台审核通过的模板ID
        //假定这个模板为：您的{1}是{2}，请于{3}分钟内填写。如非本人操作，请忽略本短信。
        "params": [code, "60"], //参数列表，将依次替换模板中的参数
        "sig": sig, //app凭证，具体计算方式见下注
        "extend": "", //可选字段，默认没有开通(需要填空)。通道扩展码，
        //在短信回复场景中，腾讯server会原样返回，开发者可依此区分是哪种类型的回复
        "ext": "" //可选字段，不需要就填空。用户的session内容，腾讯server回包中会原样返回
    }


    var $url = 'https://yun.tim.qq.com/v3/tlssmssvr/sendsms?sdkappid=1400000440&random='+code

    request.post({url:$url, formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);


        res.end();
    });



    //console.log(sig);
    //
    //res.render('index',{
    //    title: 'owen tools',
    //});


};