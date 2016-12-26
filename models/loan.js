var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义数据库字段,data是定义数据库的字段属性
var ModelSchema = new Schema({
    name: {
        type: String
    },
    imgUrl: String,
    links: {
        type: String
    },
    limit: {
        type: String
    },
    rate: {
        type: String
    },
    description: {
        type: String
    },
    classify:{
        type: String,
        default: '工薪贷'
    },
    // 创建时间
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Loan', ModelSchema);
