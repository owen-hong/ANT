/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var models  = require('../models');
var OneSelf    = models.User;

//find all
exports.findAll = function (start,listRows,callback) {
    OneSelf
        .find()
        .sort('-created')
        .limit(listRows)
        .skip(start)
        .exec(callback);
}

//find channel all
exports.findChannelAll = function (id,start,listRows,callback) {
    OneSelf
        .find({channelId: id})
        .sort('-created')
        .limit(listRows)
        .skip(start)
        .exec(callback);
}

//find phone
exports.findPhone = function (phone, callback) {
    OneSelf
        .findOne({phone: phone})
        .exec(callback);
}

//find Channel Id
exports.findChannelId = function (id, callback) {
    OneSelf
        .find({channelId: id})
        .sort('created')
        .exec(callback);
}
exports.findChannelCount = function(id,callback) {
    OneSelf.count({channelId: id},callback);
}



//查询所有文章数量
exports.findCount = function(callback) {
    OneSelf.count(null,callback);
}



//find name
exports.findName = function (name, callback) {
    OneSelf
        .findOne({name: name})
        .sort('created')
        .exec(callback);
}



//save
exports.newAndSave = function (data, callback) {
    var self             = new OneSelf();

    self.name            = data.name;
    self.phone           = data.phone;
    self.password        = data.password;
    self.activeType      = data.activeType;
    self.channelId       = data.channelId;
    self.amount          = data.amount;
    self.weight          = data.weight;

    self.save(callback);
};
