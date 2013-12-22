var tap = require('tap');
var easel = require('./../build/easel-mapper');
var util = require('util');

function real_equal(test, a, b, range, msg) {
    var d = Math.abs(a - b);
    // console.log('comparing real %s to %s within %s: %s -- diff %s', a, b, range, msg, d);
    test.ok(d < range, msg);
}

tap.test('draw_hex', function (draw_hex_test) {

    draw_hex_test.test('placement', function (placement_test) {
        var RADIUS = 10;
        var HEX_HEIGHT_RAD = Math.sin(60 * Math.PI/180) * RADIUS;

        var ROW = -4;
        var COL = 6;

        placement_test.test('at origin', function (ptao) {

            var placement = easel.EASEL_MAP.util.draw_hex.placement(0, 0, RADIUS, true);
            real_equal(ptao, placement.center_x, 0, 0.0001, 'origin center only placement center_x');
            real_equal(ptao, placement.center_y, 0, 0.0001, 'origin center only placement center_y');

            var long_placement = easel.EASEL_MAP.util.draw_hex.placement(0, 0, RADIUS);

            real_equal(ptao, long_placement.top, -HEX_HEIGHT_RAD, 0.0001, 'origin placement top');
            real_equal(ptao, long_placement.bottom, HEX_HEIGHT_RAD, 0.0001, 'origin placement bottom');
            real_equal(ptao, long_placement.left, -RADIUS, 0.0001, 'origin placement left');
            real_equal(ptao, long_placement.right, RADIUS, 0.0001, 'origin placement right');

            ptao.end();
        });
        
        placement_test.test('offset', function(pto){
            var placement = easel.EASEL_MAP.util.draw_hex.placement(ROW, COL, RADIUS, true);

            var center_y = HEX_HEIGHT_RAD  * ROW * 2;
            var center_x = 90;
            real_equal(pto, placement.center_x, center_x, 0.0001, 'center only placement center_x');
            real_equal(pto, placement.center_y, center_y, 0.0001, 'center only placement center_y');

            var long_placement = easel.EASEL_MAP.util.draw_hex.placement(ROW, COL, RADIUS);

            real_equal(pto, long_placement.top, center_y - HEX_HEIGHT_RAD, 0.0001, 'placement top');
            real_equal(pto, long_placement.bottom, center_y + HEX_HEIGHT_RAD, 0.0001, 'placement bottom');
            real_equal(pto, long_placement.left, center_x - RADIUS, 0.0001, 'placement left');
            real_equal(pto, long_placement.right, center_x + RADIUS, 0.0001, 'placement right');

            pto.end();
        });
        
        placement_test.end();
    });

    draw_hex_test.test('extent', function(extent_test){

        var LEFT = -150;
        var RIGHT = 100;
        var TOP = -100;
        var BOTTOM = 50;
        var RADIUS = 7;

        var extent = easel.EASEL_MAP.util.draw_hex.hex_extent(LEFT, RIGHT, TOP, BOTTOM, RADIUS);

        extent_test.ok(extent.top_left_extent.right<= LEFT, 'extent right <= left');
        extent_test.ok(extent.top_left_extent.bottom<= TOP, 'extent bottom <= top');
        extent_test.ok(extent.bottom_right_extent.left >= RIGHT, 'extent left <= right');
        extent_test.ok(extent.bottom_right_extent.top>= BOTTOM, 'extent top <= bottom');
      //  console.log('extent: %s', util.inspect(extent));

        extent_test.end()
    })

    draw_hex_test.end();

});