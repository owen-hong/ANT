/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var models  = require('../models');
var OneSelf    = models.User;

//查询指定id
exports.findOne = function (id, callback) {
    OneSelf
        .findOne({_id: id})
        .exec(callback);
}

//查询指定name
exports.findName = function (name, callback) {
    OneSelf
        .find({name: name})
        .sort('created')
        .exec(callback);
}



//新增
exports.newAndSave = function (data, callback) {
    var self             = new OneSelf();

    self.name            = data.name;
    self.phone           = data.phone;
    self.password        = data.password;
    self.activeType      = data.activeType;
    self.channelId       = data.channelId;

    self.save(callback);
};
