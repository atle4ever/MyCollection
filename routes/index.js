
/*
 * GET home page.
 */

var callback = function(res, body) {
    var xpath = require('xpath'), dom = require('xmldom').DOMParser;

    var doc = new dom().parseFromString(body);

    var subject = xpath.select("//*[@id=\"board\"]/div[1]/div[2]/h2/a/text()", doc).toString();
    var list = xpath.select("//*[@id=\"ENTRIES\"]/tbody/tr", doc);
    var author = xpath.select("//*[@id=\"board\"]/div[1]/div[2]/dl[1]/dd[1]/a/strong/text()", doc).toString();

    var XMLWriter = require('xml-writer');
    var ATOMWriter = require('atom-writer');

    xw = new XMLWriter(true);
    aw = new ATOMWriter(xw);

    aw
        .startFeed('http://novel.munpia.com/13451')
        .writeTitle(subject)
        .writeLink('atle4ever.iptime.org:3000', 'application/atom+xml', 'self');

    var subjects = [];
    for(var i = 0; i < list.length; i++) {
        var line = list[i];
        var subject = xpath.select("./td[2]/a[1]/text()", line).toString();
        var link = 'http://novel.munpia.com' + xpath.select1("./td[2]/a[1]/@href", line).value;
        var date = xpath.select("./td[3]/text()", line).toString();
        subjects.push(subject);

        console.log(subject);
        console.log(link);
        console.log(date);

        aw
            .startEntry(link)
            .writeTitle(subject)
            .writeLink(link, 'text/html')
            .writeContent('No contents', 'text', 'en')
            .writeAuthor(author)
            //.writeCategory('term', 'http://exemple.com#scheme')
            .endEntry()
    }

    aw.endFeed();

    res.header('Content-Type','application/atom+xml');
    res.send(xw.toString());
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
