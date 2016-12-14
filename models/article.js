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
    author: String,
    tags: {
        type: String,
        default: ''
    },
    authorIcon: {
        type: String,
        default: '/images/owen.jpg'
    },
    userId: {
        type: String,
        default: ''
    },
    imgUrl: String,
    classify: String,
    Content: String,
    addPraise: {
        type: String,
        default: 0
    },
    top: {
        type: Boolean,
        default: false
    },
    clickCount: {
        type: Number,
        default: 0
    },
    domain : {
        type: String,
        default: ''
    },
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


mongoose.model('article', ModelSchema);