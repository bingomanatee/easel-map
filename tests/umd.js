var tap = require('tap');

var app = require('./../test-site/app');
var phantom = require('node-phantom');
var path = require('path');
var my_path = path.resolve(__dirname, './../build/easel-map');
console.log('my_path: %s', my_path);
var easel_map = require(my_path);
var util = require('util');

console.log('em: %s', util.inspect(easel_map));

tap.test('testing EASEL_MAP - node', {skip: 0}, function (test) {
    test.equal(easel_map.util.color(100, 200, 255), 'rgb(100, 200, 255)', 'EASEL_MAP.util.color(100,200,255)');
    test.equal(easel_map.util.average(1, 2, 3), 2, 'EASEL_MAP.util.average(1,2,3)');

    var map = new easel_map.Map({left: -100,
        right: 100,
        top: -200,
        bottom: 200
    });
    test.equal(map.width(), 200, 'width: 200');
    test.equal(map.height(), 400, 'width: 400');

    test.end();
});

tap.test('testing UMD', {skip: 0}, function (test) {
    app(function () {

        phantom.create(function (err, ph) {
            if (err) throw err;
            return ph.createPage(function (err, page) {
                if (err) throw err;
                page.open('http://localhost:8080/phantomjs.html', function (err, status) {
                    if (err) throw err;
                    console.log('status: ', status);

                    page.evaluate(function () {
                        return  EASEL_MAP.util.color(100, 200, 255);
                    }, function (err, result) {
                        if (err) throw err;
                        test.equal(result, 'rgb(100, 200, 255)', 'EASEL_MAP.util.color(100, 200, 255)');

                        page.evaluate(function () {
                            return EASEL_MAP.util.average(1, 2, 3);
                        }, function (err, result) {
                            test.equal(result, 2, 'EASEL_MAP.util.average(1,2,3)');

                            page.evaluate(function(){
                                var map = new EASEL_MAP.Map({left: -100,
                                    right: 100,
                                    top: -200,
                                    bottom: 200
                                });
                                return [map.width(), map.height()];
                            }, function(err, data){
                                test.equal(data[0], 200, 'Map.width()');
                                test.equal(data[1], 400, 'Map.height()');
                                ph.exit();
                                test.end();
                            })
                        });
                    });
                });
            });
        });
    });
});

