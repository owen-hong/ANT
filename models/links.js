var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义数据库字段,data是定义数据库的字段属性
var ModelSchema = new Schema({
    keywords: {
        type: String
    },
    links: {
        type: String
    },
    concact: {
        type: String
    },
    // 创建时间
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Links', ModelSchema);
