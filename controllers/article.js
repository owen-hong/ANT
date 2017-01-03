/**
 * Created by owenhong on 2016/12/9.
 */

'use strict';

var Article = require('../proxy/article.js');
var Links = require('../proxy/links.js');
var moment = require('moment');
var fs = require('fs-extra');


//文章列表
exports.article = function (req, res) {

    Article.findCount(function (err, count) {
        if (err) {
            return res.send(err);
        }

        //每页展示数量
        var listRows = 10;
        var maxPage = Math.ceil(count / listRows);

        var $page = req.query.page ? req.query.page : 1;
        var currentPage = $page <= 0 ? 1 : $page;

        console.log(currentPage);

        //数据开始位置
        var start = (currentPage - 1) * listRows;

        //查询
        var fields = 'title created updated author classify clickCount top';

        Article.findAll(fields, start, listRows, function (err, posts) {
            if (err) {
                return res.send(err);
            }
            if (posts == "") {
                res.render('admin/article', {
                    title: '文章首页',
                    nullTip: '暂无数据！',
                    posts: ""
                });
            } else {
                res.render('admin/article', {
                    title: '文章首页',
                    currentPage: currentPage,
                    maxPage: maxPage,
                    posts: posts,
                    nullTip: ""
                });
            }
        });
    });
};

//添加文章
exports.addArt = function (req, res) {
    res.render('admin/addArticle', {
        title: '添加文章'
    });
};

//保存文章
exports.doArtPost = function (req, res) {
    var data = {
        title: req.body.title,
        keywords: req.body.keywords,
        description: req.body.description,
        author: req.session.userName,
        authorIcon: req.session.icon,
        imgUrl: req.body.imgUrl,
        classify: req.body.classify,
        Content: req.body.Content,
        tags: req.body.tags,
        userId: req.session.userId,
        domain : req.body.domain
    }

    console.log(data);

    //保存数据
    Article.newAndSave(data, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        res.send("<h2>发布成功！两秒后回到首页！</h2><script>setTimeout(function(){window.location.href='/admin/article';},2000);</script>");
    });
};

//编辑文章
exports.editArt = function (req, res) {
    Article.findOne(req.query.artId, function (err, persons) {
        if (err) {
            return res.send(err);
        }

        res.render('admin/editArticle', {
            title: '编辑文章',
            posts: persons,
        });

    });
}
exports.doEditUpdate = function (req, res) {
    if (req.body.tags === undefined) {
        var tags = "";
    } else {
        var tags = req.body.tags;
    }

    var data = {
        title: req.body.title,
        keywords: req.body.keywords,
        description: req.body.description,
        author: req.session.userName,
        authorIcon: req.session.icon,
        imgUrl: req.body.imgUrl,
        classify: req.body.classify,
        Content: req.body.Content,
        domain:req.body.domain,
        updated: new Date(),
        tags: tags,
        userId: req.session.userId
    }


    Article.updateById(req.query.artId, data, function (err, posts) {
        if (err) {
            return res.send(err);
        }

        res.redirect('/admin/article');
    });
}

//置顶文章
exports.topArt = function(req,res){
    if(req.query.topArt){
        Article.updateById(req.query.artId,{
            top:false
        },function(err,posts){
            if (err) {
                return res.send(err);
            }
            res.redirect('/admin');
        });
    }else{
        Article.updateById(req.query.artId,{
            top:true
        },function(err,posts){
            if (err) {
                return res.send(err);
            }
            res.redirect('/admin');
        });
    }
}

//删除文章
exports.deletArt = function (req, res) {
    Article.removeById(req.query.artId, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/admin/article');
    });
}
//上传图片
exports.file = function (req, res) {
    res.render('admin/file', {
        title: '文件上传',
    });
}

//文件上传
exports.doUpload = function (req, res) {

    console.log('doUpload....');

    var urlPath = [];
    var $time = moment(new Date()).format('YYYYMMDD');
    var newFileRoad = './public/uploads/' + $time;

    for (var i in req.files) {
        if (req.files[i].size == 0) {
            // 使用同步方式删除一个文件
            fs.unlinkSync(req.files[i].path);
            console.log('Successfully removed an empty file!');
        } else {
            var tpm_type = req.files[i].type.split("/")[1];
            var tpm_date = (Date.parse(new Date()) / 1000) + (Math.round(Math.random() * 9999));

            //创建当前日期的目录存放图片
            if (!fs.existsSync(newFileRoad)) {
                fs.mkdirSync(newFileRoad);
                console.log('Common目录创建成功');
            }

            var target_path = './public/uploads/' + $time + '/' + tpm_date + '.' + tpm_type;
            var openUrl = 'uploads/' + $time + '/' + tpm_date + '.' + tpm_type;

            urlPath.push(openUrl);

            // 使用同步方式重命名一个文件
            var readStream = fs.createReadStream(req.files[i].path);
            var writeStream = fs.createWriteStream(target_path);
            readStream.pipe(writeStream);

            console.log('Successfully renamed a file!');
        }
    }

    res.json({
        Url: urlPath
    });
}

//友情链接
exports.linkList = function (req, res) {
    Links.findAll(function (err, posts) {
        if (err) {
            return res.send(err);
        }

        res.render('admin/linkList', {
            title: '友情列表',
            posts: posts
        });
    });
}

//添加友情链接
exports.addLink = function (req, res) {
    res.render('admin/addLink', {
        title: '添加友情链接',
        posts: '',
        update: false
    });
}
exports.doAddLink = function (req, res) {

    if(req.body.links.indexOf("http://")){
        var options = {
            keywords: req.body.keyword,
            links: "http://" + req.body.links,
            concact: req.body.concact
        };
    }else{
        var options = {
            keywords: req.body.keyword,
            links: req.body.links,
            concact: req.body.concact
        };
    }

    Links.newAndSave(options, function (err, posts) {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.redirect('/admin/linkList');
    });
}

//编辑友情链接
exports.updateLink = function (req, res) {
    Links.findOne(req.query.id, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        res.render('admin/addLink', {
            title: '编辑友情链接',
            posts: posts,
            update: true
        });
    });
}
exports.doUpdateLinks = function (req, res) {
    var $id = req.body.linkId;

    var data = {
        keywords: req.body.keyword,
        links: req.body.links,
        concact: req.body.concact
    }

    Links.updateById(req.body.linkId, data, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/admin/linkList');
    });
}

//删除友情链接
exports.doRemoveLinks = function (req, res) {
    Links.removeById(req.query.id, function (err, posts) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.redirect('/admin/linkList');
    });
}




















