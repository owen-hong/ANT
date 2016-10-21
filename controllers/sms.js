/**
 * Created by owenhong on 2016/10/20.
 */

var TopClient = require('./topClient').TopClient;

var client = new TopClient({
    'appkey': '23488432',
    'appsecret':'e3e204fb11edb3afa5bc4392ee0796c6',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

client.execute('alibaba.aliqin.fc.sms.num.send', {
    'extend': '123456',
    'sms_type': 'normal',
    'sms_free_sign_name':'520UED前端',
    'sms_param': '{\"name\":\"欧文\",\"code\":\"5201314\",\"time\":\"5\"}',
    'rec_num': '18820183227',
    'sms_template_code': 'SMS_19565021'
}, function (error, response) {
    if (!error) {
        console.log(response.result.model);
        console.log(response.result.success);

    }
    else {
        console.log(error);
    }
});



