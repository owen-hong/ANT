/**
 * Created by owenhong on 2016/10/9.
 */

'use strict';
var request = require('request');
var md5 = require('md5');


var User = require('../proxy/user.js');


exports.index = function(req,res){
    User.findName('owen',function(err,data){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        console.log('success...');
        res.json(data);
    })
};
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