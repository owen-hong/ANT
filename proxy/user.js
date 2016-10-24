/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var models  = require('../models');
var OneSelf    = models.User;

//��ѯall
exports.findAll = function (callback) {
    OneSelf
        .find()
        .sort('-created')
        .exec(callback);
}

//��ѯָ��id
exports.findPhone = function (phone, callback) {
    OneSelf
        .find({phone: phone})
        .exec(callback);
}



//��ѯָ��name
exports.findName = function (name, callback) {
    OneSelf
        .findOne({name: name})
        .sort('created')
        .exec(callback);
}



//����
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
