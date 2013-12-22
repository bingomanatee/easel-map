(function (window) {


    var COS_30 = Math.cos(Math.PI / 6);
    var SIN_30 = Math.sin(Math.PI / 6);
    var COS_60 = SIN_30;
    var SIN_60 = COS_30;

    var COS_30_x_2 = COS_30 * 2;
    var COS_30_x_3 = COS_30 * 3;
    var COS_30_x_3_div_2 = COS_30 * 3 / 2;
    var COS_30_div_2 = COS_30 / 2;

    var CACHED_HEXES = {};

    /**
     * this library draws hexagons with the passed in shape.
     * It also has methods for predicting the drawn hex's extent based on
     * its index and its size. It is functional to reduce the overhead of
     * large numbers of drawn hexes.
     *
     * The center is computed by its position on a "jagged grid".
     * The hexagon's points are aligned so that they start at the left
     * and right corners (3 and 9 o'clock), so it's flat on the top and bottom.
     */

    window.EASEL_MAP.util.draw_hex = {};

    var COL_UNIT_SCALE = (1 + SIN_30);
    var ROW_UNIT_SCALE = (2 * SIN_60);

    function _center_x(row, col, radius) {
        return col * radius * COL_UNIT_SCALE;
    }

    function _center_y(row, col, radius) {
        var k = row;
        if (col % 2) {
            k -= 0.5;
        }
        return k * radius * ROW_UNIT_SCALE;
    }

    function _calc_points(row, col, radius) {

        var x = _center_x(row, col, radius);
        var y = _center_y(row, col, radius);

        var xs = [
            x + -radius * radius,
            x + -radius * SIN_30 * radius,
            x + radius * SIN_30 * radius,
            x + radius * radius
        ];

        var ys = [
            y + -radius * COS_30 * radius,
            y,
            y + radius * COS_30 * radius];

        return [
            xs[0], ys[1],
            xs[1], ys[0],
            xs[2], ys[0],
            xs[3], ys[1],
            xs[2], ys[2],
            xs[1], ys[2]
        ];
    }

    window.EASEL_MAP.util.draw_hex.placement = function (row, col, radius, center_only) {
        var out = {
            center_x: _center_x(row, col, radius),
            center_y: _center_y(row, col, radius)
        };

        if (center_only) return out;

        out.top = out.center_y - (SIN_60 * radius);
        out.bottom = out.center_y + (SIN_60 * radius);
        out.left = out.center_x - radius;
        out.right = out.center_x + radius;
        out.width = out.right - out.left;
        out.height = out.bottom - out.top;

        return out;
    };

    var DEBUG_EXTENT = false;

    window.EASEL_MAP.util.draw_hex.hex_extent = function (left, right, top, bottom, radius) {
        // estimating top left coordinates based on derived projection of center
        var left_col = Math.floor(left / (radius * COL_UNIT_SCALE));
        var top_row = Math.floor(top / (radius * ROW_UNIT_SCALE));
        var bottom_row = 0;
        var right_col = 0;
        var failsafe = 30;

        var top_left_placement = window.EASEL_MAP.util.draw_hex.placement(top_row, left_col, radius);
        // ensuring that top_left_placement starts inside target area


        while (failsafe-- > 0 && top_left_placement.bottom < top) {
            if (DEBUG_EXTENT) console.log('moving down tlp.bottom: %s, top: %s, r: %s, c: %s', top_left_placement.bottom, top, top_row, left_col);
            top_left_placement = window.EASEL_MAP.util.draw_hex.placement(++top_row, left_col, radius);
        }
        while (failsafe-- > 0 && top_left_placement.right < left) {
            if (DEBUG_EXTENT)  console.log('moving right tlp.bottom: %s, top: %s, r: %s, c: %s', top_left_placement.bottom, top, top_row, left_col);
            top_left_placement = window.EASEL_MAP.util.draw_hex.placement(top_row, ++left_col, radius);
        }

        // moving the top_left_placement out of range
        while (failsafe-- > 0 && top_left_placement.bottom > top) {
            if (DEBUG_EXTENT) console.log('moving left tlp.bottom: %s, top: %s, r: %s, c: %s', top_left_placement.bottom, top, top_row, left_col);
            top_left_placement = window.EASEL_MAP.util.draw_hex.placement(--top_row, left_col, radius);
        }
        while (failsafe-- > 0 && top_left_placement.right > left) {
            if (DEBUG_EXTENT)  console.log('moving up tlp.bottom: %s, top: %s, r: %s, c: %s', top_left_placement.bottom, top, top_row, left_col);
            top_left_placement = window.EASEL_MAP.util.draw_hex.placement(top_row, --left_col, radius);
        }

        right_col = Math.floor(right / (radius * COL_UNIT_SCALE));
        bottom_row = Math.floor(bottom / (radius * ROW_UNIT_SCALE));

        var bottom_right_placement = window.EASEL_MAP.util.draw_hex.placement(bottom_row, right_col, radius);
        // ensuring that bottom_right_placement starts inside target area
        while (failsafe-- > 0 && bottom_right_placement.top > bottom) {
            if (DEBUG_EXTENT)   console.log('brp.bottom: %s, top: %s, r: %s, c: %s', bottom_right_placement.bottom, top, bottom_row, right_col);
            bottom_right_placement = window.EASEL_MAP.util.draw_hex.placement(--bottom_row, right_col, radius);
        }
        while (failsafe-- > 0 && bottom_right_placement.left > right) {
            if (DEBUG_EXTENT)  console.log('brp.bottom: %s, top: %s, r: %s, c: %s', bottom_right_placement.bottom, top, bottom_row, right_col);
            bottom_right_placement = window.EASEL_MAP.util.draw_hex.placement(bottom_row, --right_col, radius);
        }

        while (failsafe-- > 0 && bottom_right_placement.top < bottom) {
            if (DEBUG_EXTENT)    console.log('brp.bottom: %s, top: %s, r: %s, c: %s', bottom_right_placement.bottom, top, bottom_row, right_col);
            bottom_right_placement = window.EASEL_MAP.util.draw_hex.placement(++bottom_row, right_col, radius);
        }
        while (failsafe-- > 0 && bottom_right_placement.left < right) {
            if (DEBUG_EXTENT)   console.log('brp.bottom: %s, top: %s, r: %s, c: %s', bottom_right_placement.bottom, top, bottom_row, right_col);
            bottom_right_placement = window.EASEL_MAP.util.draw_hex.placement(bottom_row, ++right_col, radius);
        }


        return {
            top: top_row,
            left: left_col,
            bottom: bottom_row,
            right: right_col,
            top_left_extent: top_left_placement,
            bottom_right_extent: bottom_right_placement
        };

    };

    window.EASEL_MAP.util.draw_hex.draw = function (row, col, radius, color, shape) {
        if (!shape) shape = new createjs.Shape();
        shape.graphics.f(color);
        var points = _calc_points(row, col, radius);

        shape.graphics.mt(points[0], points[1]);
        var os = 2;
        while (os < points.length) {
            shape.graphics.lt(points[os], points[os + 1]);
            os += 2;
        }
        shape.graphics.ef();
        return shape;
    };

})(window);