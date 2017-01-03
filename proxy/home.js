/**
 * Created by owenhong on 2016/12/9.
 */

'use strict';
var models = require('../models/');
var OneSelf    = models.Home;

//查询指定文章
exports.findOne = function (id, callback) {
    if(id.length =="24"){
        OneSelf.findOne({
                _id: id
            },
            callback
        );
    }else{
        OneSelf.findOne({
                domain: id
            },
            callback
        );
    }
}


//查询所有文章
exports.findAll = function (fields, skip, count, callback) {
    OneSelf.find()
        .sort('-created -top')
        .limit(count)
        .skip(skip)
        .exec(callback);

//    OneSelf.find({}, '', {limit:count, skip:skip, sort: '-top -_id'}, callback);
}


//查询所有文章数量
exports.findCount = function (callback) {
    OneSelf.count(null,callback);
}


//查询指定分类的文章
exports.findCategory = function (name, callback) {
    OneSelf.find({
            classify: name
        },
        callback
    );
}


//查询tags
exports.findTags = function (name, callback) {
    OneSelf.find({
            tags: name
        },
        callback
    );
}


//模糊查询,搜索查询
exports.searchTitle = function (title, callback) {
    var query={};
    query['title'] = new RegExp(title);

    OneSelf.find(query,callback);
}


//update指定ID信息
exports.updateById = function (id, data, callback) {

    OneSelf.findByIdAndUpdate(id,{ $set:data },callback);

}


//删除指定id的数据
exports.removeById = function (id, callback) {
    OneSelf.findByIdAndRemove(id,callback);
}


//保存文章
exports.newAndSave = function (opts, callback) {
    var self = new OneSelf();

    self.title = opts.title;
    self.keywords =  opts.keywords;
    self.description =  opts.description;
    self.imgUrl =  opts.imgUrl;
    self.company =  opts.company;
    self.about =  opts.about;
    self.qq =  opts.qq;
    self.phone =  opts.phone;
    self.email =  opts.email;
    self.wechat =  opts.wechat;
    self.address =  opts.address;
    self.copyright =  opts.copyright;

    self.save(callback);
};
