var assert = require('assert');

var phantomjsWrapper = require('phantomjs-wrapper');
var path = require('path');

require('http').createServer(function (request, response) {
    response.end('<html><body>' +
        '<script language="javascript">function foo(a){ return 2 * a }</script>' +
        '</body></html>', 'utf8');
}).listen(8123, function () {

        phantomjsWrapper({timeout: 600}, function (err, phantomjs) {
            phantomjs.createPage(function (err, page) {
                page.open('http://localhost:8123/index.html', function (err) {
                    page.evaluateJavaScript(function () {
                        return  foo(2);
                    }.toString(), function (err, result) {
                        if (err) throw err;
                        assert.equal(result, 4, 'phantom returning 4  as foo(2)');
                        page.close(function (err) {
                            phantomjs.close(function (err) {
                                console.log('phantom and page is closed', err);
                                // note -- process will not close here.
                            });
                        });
                    });
                });
            });
        });
    });
