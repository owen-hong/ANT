var models  = require('../models');
var OneSelf    = models.Links;

//查询所有数据
exports.findAll = function (callback) {
    OneSelf.find(null, callback);
}

//查询指定id一条数据
exports.findOne = function (id, callback) {
    OneSelf.findOne({
            _id: id
        },
        callback
    );
}

//update指定ID信息
exports.updateById = function (id, data, callback) {
    OneSelf.findByIdAndUpdate(id, {
        $set: data
    }, callback);
}

//删除指定id的数据
exports.removeById = function (id, callback) {
    OneSelf.findByIdAndRemove(id, callback);
}

//保存
exports.newAndSave = function (opts, callback) {
    var links = new OneSelf();

    links.keywords =  opts.keywords;
    links.links =  opts.links;
    links.concact =  opts.concact;

    links.save(callback);
};
