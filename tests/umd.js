var tap = require('tap');

var app = require('./../test-site/app');
var phantom = require('node-phantom');
var path = require('path');
var my_path = path.resolve(__dirname, './../easel-map');
console.log('my_path: %s', my_path);
var easel_map = require(my_path);
var util = require('util');
var Canvas = require('canvas');
var easel = require('node-easel');
var _ = require('underscore');
var fs = require('fs');

function canvas_to_file(canvas, file_path, done){
       var out = fs.createWriteStream(file_path)
        , stream = canvas.pngStream();

    stream.on('data', function(chunk){
        out.write(chunk);
    });

    stream.on('end', done);
}

function load_image_file(img_path, callback){
    var stream = fs.createReadStream(img_path);
    var buffer;

    stream.on('data', function(new_data){
        buffer = buffer ? Buffer.Concat(buffer, new_data) : new_data;
    });

    stream.on('end', function(){
        var image = new Canvas.Image();
        image.src = buffer;
        callback(null, image);
    });

    stream.on('error', callback);
}

tap.test('testing EASEL_MAP - node', {skip: 0}, function (test) {
    test.equal(easel_map.util.color(100, 200, 255), 'rgb(100, 200, 255)', 'EASEL_MAP.util.color(100,200,255)');
    test.equal(easel_map.util.average(1, 2, 3), 2, 'EASEL_MAP.util.average(1,2,3)');


    var map = new easel_map.Map({left: -2000, right: 2000, top: -1000, bottom: 1000});

    test.equal(map.width(), 4000, 'width: 4000');
    test.equal(map.height(), 2000, 'width: 2000');

    var BOX_INC = 100;
    var BOX_WIDTH = 80;
    var BOX_COLR = 'red';

    var layer = map.add_layer('boxes', {
        add_tile_shapes: function (tile) {
            var left = tile.left();
            left -= left % BOX_INC;
            var right = tile.right() + BOX_INC;
            right -= right % BOX_INC;
            var top = tile.top();
            top -= BOX_INC;
            var bottom = tile.bottom() + BOX_INC;
            bottom -= bottom % BOX_INC;

            var shape = new createjs.Shape();

            tile.container().addChild(shape);

            _.each(_.range(left, right, BOX_INC),
                function (x) {
                    _.each(_.range(top, bottom, BOX_INC), function (y) {
                        shape.graphics.f(BOX_COLR).dr(x, y, BOX_WIDTH, BOX_WIDTH).ef();
                    })
                });
        }
    });

    var c = new Canvas(500, 300);
    var stage = new createjs.Stage(c);
    map.render({left: 25, top: 25, scale:1}, stage);
    stage.update();
    canvas_to_file(c, __dirname + '/map_canvas.png', function() //drawing image to disk for inspection
    {
        var canvas = new Canvas(500, 300);
        load_image_file(__dirname + '/map_canvas_expect.png', function(err, img){

            var c2 = new Canvas(500, 300);
            var ctx2 = c2.getContext('2d');
            ctx2.drawImage(img, 0, 0, 500, 300);

            var ctx1 = c.getContext('2d');

            var i1 = ctx1.getImageData(0, 0);
            var i2 = ctx2.getImageData(0, 0);

            var diff = 0;

            _.each(i1.data, function(value, index){
                diff = Math.abs(value - i2.data[index]);
            });

            test.ok(diff < 50, 'map image is not significantly different than saved expectation');
            test.end();
        });

    })

});

tap.test('testing UMD', {skip: 0}, function (test) {
    app(function (server) {

        phantom.create(function (err, ph) {
            if (err) throw err;
            return ph.createPage(function (err, page) {
                if (err) throw err;
                page.open('http://localhost:8080/phantomjs.html', function (err, status) {
                    if (err) throw err;
                    console.log('status: ', status);

                    page.evaluate(function () {
                            var ctx = stage.canvas.getContext('2d');
                            var i = ctx.getImageData(0, 0, 10, 10);
                            return _.toArray(i.data);
                        },
                        function (err, result) {
                            test.deepEqual(result,require('./canvas_data.json'), 'canvas image data');

                            page.evaluate(function () {
                                return  EASEL_MAP.util.color(100, 200, 255);
                            }, function (err, result) {
                                if (err) throw err;
                                test.equal(result, 'rgb(100, 200, 255)', 'EASEL_MAP.util.color(100, 200, 255)');

                                page.evaluate(function () {
                                    return EASEL_MAP.util.average(1, 2, 3);
                                }, function (err, result) {
                                    test.equal(result, 2, 'EASEL_MAP.util.average(1,2,3)');

                                    page.evaluate(function () {
                                        var map = new EASEL_MAP.Map({left: -100,
                                            right: 100,
                                            top: -200,
                                            bottom: 200
                                        });
                                        return [map.width(), map.height()];
                                    }, function (err, data) {
                                        test.equal(data[0], 200, 'Map.width()');
                                        test.equal(data[1], 400, 'Map.height()');
                                        ph.exit();
                                        server.close();
                                        test.end();
                                    })
                                });
                            });
                        });
                });
            });
        });
    });
});

