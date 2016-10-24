/**
 * Created by owenhong on 2016/10/18.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    name: String,
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    activeType:String,
    channelId: {
        type: String,
        default: 'ANT-User'
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

ModelSchema.index({phone : 1});
ModelSchema.index({channelId : 1});
ModelSchema.index({created : -1});

mongoose.model('User', ModelSchema);