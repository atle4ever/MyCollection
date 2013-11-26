
/*
 * GET home page.
 */

var callback = function(res, body) {
    var xpath = require('xpath'), dom = require('xmldom').DOMParser;

    var doc = new dom().parseFromString(body);

    var subject = xpath.select("//*[@id=\"board\"]/div[1]/div[2]/h2/a/text()", doc).toString();
    var list = xpath.select("//*[@id=\"ENTRIES\"]/tbody/tr", doc);
    var author = xpath.select("//*[@id=\"board\"]/div[1]/div[2]/dl[1]/dd[1]/a/strong/text()", doc).toString();

    var subjects = [];
    for(var i = 0; i < list.length; i++) {
        var line = list[i];
        var id = xpath.select("./td[1]/span/text()", line).toString();
        var subject = xpath.select("./td[2]/a[1]/text()", line).toString();
        var link = 'http://novel.munpia.com' + xpath.select1("./td[2]/a[1]/@href", line).value;
        var date = xpath.select("./td[3]/text()", line).toString();
        subjects.push(subject);

        console.log(subject);
        console.log(link);
        console.log(date);
    }

    res.header('Content-Type','application/atom+xml');
    res.send('done');
    // res.render('index', { title: 'Express', subjects: subjects });
}

exports.index = function(req, res){
    var request = require('request');

    request.get('http://novel.munpia.com/13451', function(err, resp, body) {
            if(!err && resp.statusCode == 200) {
                callback(res, body);
            } else {
                alert('Error during get html src from munpia');
            }
    });
};
