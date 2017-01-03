/**
 * Created by owenhong on 2016/12/9.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义数据库字段,data是定义数据库的字段属性
var ModelSchema = new Schema({
    title: String,
    keywords: String,
    description: String,
    imgUrl: String,
    company: String,
    about: String,
    phone: String,
    qq: String,
    email: String,
    wechat: String,
    address: String,
    copyright: String,
    // 创建时间
    created: {
        type: Date,
        default: Date.now
    },
    // 更新时间
    updated: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Home', ModelSchema);