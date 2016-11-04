/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        default: '暂无'
    },
    password:{
        type: String,
        required: true
    },
    channelId: {
        type: String,
        default: 'Admin-User'
    },
    amount:{
        type:Number,
        default: 0
    },
    weight:{
        type: String,
        default: '2'
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('adminUser', ModelSchema);