var models  = require('../models');
var OneSelf    = models.Loan;

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
    var self = new OneSelf();

    self.name =  opts.name;
    self.imgUrl =  opts.imgUrl;
    self.links =  opts.links;
    self.limit =  opts.limit;
    self.rate =  opts.rate;
    self.description =  opts.description;
    self.classify =  opts.classify;
    self.created =  opts.created;

    self.save(callback);
};
