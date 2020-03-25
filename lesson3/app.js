var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('https://nj.meituan.com/s/%E9%9D%A2%E5%8C%85/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.link item-title .rate-stars').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('link item-title'),
          href: $element.attr('rate-stars')
        });
      });

      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});