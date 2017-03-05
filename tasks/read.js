var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('crawl:read');

exports.movie = function (url, callback) {
    //请求网页内容
    request({url, encoding: null}, function (err, response, body) {
        //实现一个转码，把gbk编码的buffer转成utf8的字符串
        body = iconv.decode(body, 'gbk');
        //把此响应体字符串转成$对象
        var $ = cheerio.load(body);
        var movies=[];
        $('.keyword .list-title').each(function () {
            //把当前对象转化成jq对象
            //声明一个电影的对象 一个是标签文本对应的电影名，一个是url地址
            var $me = $(this);
            var movie={
                name:$me.text(),
                url:$me.attr('href')
            }
            debug(`读到电影：${movie.name}`)
            movies.push(movie);
        })
        callback(err,movies);
    })
}
/*
exports.movie('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1&qq-pf-to=pcqq.group',function (err, movies) {
    console.log(movies)
})
*/
