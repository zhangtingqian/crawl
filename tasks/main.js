/*
 * 1写一个read模块，用来传入url地址，返回读取后的对象数组
 * 2把上面的对象数组保存在数据库中mongodb
 * 3简历一个web服务器显示保存的数据库
 * 4开启一个计划任务每小时更新一次数据库
 * 5把此项目发布到geithub并且部署到阿里云上
 * */
var read = require('./read').movie;
var write = require('./write').movie;
var async = require('async');
var debug = require('debug')('crawl:main');
var Movie = require('../model').Movie;
var url='http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1&qq-pf-to=pcqq.group';

//因为是异步的，而且任务之间是有关系的所以选择waterfall
async.waterfall([
    function (callback) {
    //在保存之前全部清空掉数据
        Movie.remove({},callback)
    },
    function (data,callback) {
        read(url,callback)
    }
    ,function (movies,callback) {
        write(movies,callback);
    }
], function (err, result) {
    debug('全部任务执行完毕')
})

