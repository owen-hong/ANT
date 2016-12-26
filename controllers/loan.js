/**
 * Created by owenhong on 2016/12/23.
 */


var Loan = require('../proxy/loan.js');
exports.loanList = function (req, res) {
    Loan.findAll(function (err, posts) {
        if (err) {
            return res.send(err);
        }

        res.render('phone', {
            title: '产品列表',
            posts: posts
        });
    });
}
