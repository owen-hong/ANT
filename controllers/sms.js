/**
 * Created by owenhong on 2016/10/20.
 */

var TopClient = require('./topClient').TopClient;

var client = new TopClient({
    'appkey': '23488432',
    'appsecret':'e3e204fb11edb3afa5bc4392ee0796c1',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

client.execute('alibaba.aliqin.fc.sms.num.send', {
    'extend': '123456',
    'sms_type': 'normal',
    'sms_free_sign_name':'520UEDÇ°¶Ë',
    'sms_param': '{\"name\":\"Å·ÎÄ\",\"code\":\"5201314\",\"time\":\"5\"}',
    'rec_num': '18820183227',
    'sms_template_code': 'SMS_19565021'
}, function (error, response) {
    if (!error) console.log(response);
    else console.log(error);
});



