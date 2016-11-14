/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var models  = require('../models');
var OneSelf    = models.adminUser;

//find all
exports.findAll = function (callback) {
    OneSelf
        .find({weight:'2'})
        .sort('-created')
        .exec(callback);
}

//find phone
exports.findChannelId = function (id, callback) {
    OneSelf
        .find({channelId: id})
        .exec(callback);
}



//find name
exports.findName = function (name, callback) {
    OneSelf
        .findOne({name: name})
        .sort('created')
        .exec(callback);
}

//删除指定id的数据
exports.removeById = function (id, callback) {
    OneSelf.findByIdAndRemove(id,callback);
}


//save
exports.newAndSave = function (data, callback) {
    var self             = new OneSelf();

    self.name            = data.name;
    self.phone           = data.phone;
    self.password        = data.password;
    self.channelId       = data.channelId;
    self.amount          = data.amount;
    self.weight          = data.weight;

    self.save(callback);
};
