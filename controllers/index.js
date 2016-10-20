/**
 * Created by owenhong on 2016/10/9.
 */

'use strict';
var request = require('request');
var md5 = require('md5');

var Redis = require('ioredis');
var redis = new Redis();

var User = require('../proxy/user.js');


exports.index = function(req,res){

    var tel = '18820183227';
    var code = '5201314';
    //redis.pipeline().get('foo').multi().set('foo', 'abc').get('foo').exec().get('foo').exec();

    redis.multi()
        //限制访问频率60秒
        .set("register:" + tel, code)
        .expire("register:" + tel, 30)
        .exec(function (err, replies) {
            if (!err)return res.json({
                errMsg: "ok",
                errCode: 0,
                data:replies
            });
        });


    //User.findName('owen',function(err,data){
    //    if(err){
    //        console.log(err);
    //        res.send(err);
    //        return;
    //    }
    //    console.log('success...');
    //    res.json(data);
    //})
};

exports.code = function(req,res){
    var tel = '18820183227';

    redis.get("register:" + tel).then(function (result) {
        console.log(result);
        res.send(result)
    }).catch(function(e){
        console.log('err');
        console.log(e);
    })

}



exports.registerUser = function(req,res){
    var userData = {
        name: 'owen',
        phone: '18820183228',
        password:'1',
        activeType:'2',
        channelId: 'owen hzy'
    };

    User.newAndSave(userData,function(err,data){
        if(err){
            console.log(err);
            res.send(err.message);
            return;
        }
        console.log('success...');
        res.send(data);
    })

};