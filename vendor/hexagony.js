if (typeof module == 'undefined') {
    (function (window) {
        window.HEXAGONY = {};
    })(window);
} else {
    module.exports = {
        make_hexes: require('./lib/make_hexes'),
        Hex: require('./lib/Hex'),
        draw_hexes: require('./lib/draw_hexes')
    };
};
(function (window) {
    var SIN_30 = Math.sin(Math.PI / 6);
    var COS_30 = Math.cos(Math.PI / 6);

// the orthoganal offsets of a hex with a radius to the flat side of 1.

    var UNIT_X = 1 / COS_30;
    var UNIT_Y = 2 * COS_30;

    function Hex_Point(hex, angle, index) {
        this.hex = hex;
        this.angle = angle;
        this.index = index;
    }

    Hex_Point.prototype = {

        unit_x: function () {
            return this.hex.unit_x() + Math.cos(this.angle);
        },

        unit_y: function () {
            return this.hex.unit_y() + Math.sin(this.angle);
        },

        x: function () {
            return this.hex.x() + (this.hex.long_radius() * Math.cos(this.angle));
        },

        y: function () {
            return this.hex.y() + (this.hex.long_radius() * Math.sin(this.angle));
        },

        toJSON: function () {
            return {
                index: this.index,
                angle: Math.round(this.angle * 180 / Math.PI),
                unit_x: this.hex.unit_x() + this.unit_x(),
                unit_y: this.hex.unit_y() + this.unit_y()
            };
        }
    };

    /**
     *
     * @param map
     * @param row
     * @param column
     * @constructor
     */
    function Hex(map, row, column) {
        this.map = map;
        this.row = row;
        this.column = column;
        this.radius = map.hex_size / 2;
        this.diameter = map.hex_size;

        this.make_points();
    }

    _.extend(Hex.prototype, {

        short_radius: function () {
            return this.radius;
        },

        long_radius: function () {
            return this.short_radius() / COS_30;
        },

        unit_x: function () {
            return this.column * UNIT_X;
        },

        unit_y: function () {
            return this.row * UNIT_Y - this.column % 2;
        },

        x: function () {
            return 1.5 * this.long_radius() * this.column;
        },

        row_place: function () {
            return this.row + (this.column % 2) / 2;
        },

        y: function () {
            return this.short_radius() * this.row_place() * 2;
        },

        toJSON: function () {
            return {
                row: this.row,
                column: this.column,
                unit_center: {
                    x: (this.unit_x()),
                    y: (this.unit_y())
                },
                points: this.points.map(function (p) {
                    return p.toJSON();
                })
            };
        },

        make_points: function () {
            this.points = _.range(0, Math.PI * 2, Math.PI / 3).map(function (angle, i) {
                return new Hex_Point(this, angle, i);
            }, this);
        }

    });


    if (typeof module != 'undefined') {
        module.exports = Hex;
    } else {
        window.HEXAGONY.Hex = Hex;
    }
})(window);;
(function () {

    if (typeof module != 'undefined') {
        var Hex = require('./Hex');
        var _ = require('underscore');
    } else {
        var Hex = HEXAGONY.Hex;
    }

    /* ------------ CLOSURE --------------- */

    /** ********************
     * Purpose: to generate a starting hex grid for a map.
     * The hexes are flat on the top/bottom.
     * The maps are (relatively) square;
     *
     * @param map
     *          - hex_size: distance from side to side of the hexagon. also, distance between two adgacent hexagons.
     *          - map_size: (minimum) width and height of the map.
     *
     * @returns {Array}
     *  a 2D array of hexes, column/row.
     */
    function generate_hexes(map) {

        var hex_radius = map.hex_size / 2; // distance from center to flat side
        var hex_side = 2 * hex_radius / Math.sqrt(3); // size of side of hex;
        var hex_side_radius = hex_radius / Math.sqrt(3); // half the side of a hex;
        var hex_long_radius = Math.sqrt(hex_side * hex_side + hex_side_radius * hex_side_radius);

        var hex_long_diameter = 2 * hex_long_radius;
        var hex_diameter = 2 * hex_radius;

        function _eastern_column() {
            var east_distance = 0;
            var columns = 2;

            while (east_distance < map.map_size / 2) {
                columns += 2;
                east_distance += hex_long_diameter + hex_side;
            }

            return columns;
        }

        function _north_row() {
            var rows = 1;
            var north_distance = 0;

            while (north_distance < map.map_size / 2) {
                north_distance += hex_diameter;
                ++rows;
            }
            return rows;
        }

        var eastern_column = _eastern_column();
        var western_column = -1 * eastern_column;

        var north_row = _north_row();
        var south_row = -1 * north_row;

        var hexes = [];

        // console.log('columns: e %s, w %s', eastern_column, western_column);
        //  console.log('rows: n %s, s %s', north_row, south_row);

        _.range(western_column, eastern_column + 1).forEach(function (column) {
            var column_hexes = [];
            _.range(south_row, north_row + 1).forEach(function (row) {
                //console.log('column: %s, row: %s', column, row);
                column_hexes.push(new Hex(map, row - south_row, column - western_column));
            });
            hexes.push(column_hexes);
        });

        return hexes;
    }

    /* -------------- EXPORT --------------- */

    if (typeof module != undefined) {

        module.exports = generate_hexes;
    } else {
        HEXAGONY.generate_hexes = generate_hexes;
    }
})();;
(function (window) {
    if (typeof module != 'undefined') {
        var Hex = require('./Hex');
        var _ = require('underscore');
        var Canvas = require('canvas');
    } else {
        var Hex = HEXAGONY.Hex;
    }

    /* ------------ CLOSURE --------------- */

    var DRAW_PARAMS_DEFAULTS = {
        margin: 0,

        circle: false,

        draw_hex: {
            stroke: {
                width: 1,
                color: 'black'
            },
            fill: 'white'
        }
    };

    /** ********************
     * Purpose: to draw hexagons
     *
     * @param hexes [[Hexes]]
     * @param draw_params {object}
     * @return canvas
     */
    function draw(hexes, draw_params) {

        draw_params = draw_params || DRAW_PARAMS_DEFAULTS;

        var margin = draw_params.margin;

        hexes = _.flatten(hexes);

        var p = hexes[0].points[0];

        var min_x = p.x(), max_x = p.x(), min_y = p.y(), max_y = p.y();

        hexes.forEach(function (hex) {
            hex.points.forEach(function (point) {
                min_x = Math.min(point.x(), min_x);
                max_x = Math.max(point.x(), max_x);
                min_y = Math.min(point.y(), min_y);
                max_y = Math.max(point.y(), max_y);
            });
        });

        var x_offset = margin - min_x;
        var y_offset = margin - min_y;

        var width = Math.ceil((2 * margin) + (max_x - min_x));
        var height = Math.ceil((2 * margin) + (max_y - min_y));

        console.log('width: %s, height: %s', width, height);

        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');

        ctx.lineWidth = 1;
        hexes.forEach(function (hex) {

            if (draw_params.hex) {

                if (draw_params.hex.fill) {
                    ctx.fillStyle = draw_params.hex.fill;
                    ctx.beginPath();
                    var x = hex.points[5].x() + x_offset;
                    var y = hex.points[5].y() + y_offset;

                    ctx.moveTo(x, y);
                    hex.points.forEach(function (point) {
                        var x = point.x() + x_offset;
                        var y = point.y() + y_offset;
                        ctx.lineTo(x, y);
                    });
                    ctx.closePath();
                    ctx.fill();
                }

            }

            if (draw_params.circle) {
                if (draw_params.circle.fill) {
                    ctx.fillStyle = draw_params.circle.fill;
                    ctx.beginPath();
                    ctx.arc(hex.x() + x_offset, hex.y() + y_offset, hex.radius, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }

                if (draw_params.circle.stroke) {
                    ctx.strokeStyle = draw_params.circle.stroke.color;
                    ctx.lineWidth = draw_params.circle.stroke.width;
                    ctx.beginPath();
                    ctx.arc(hex.x() + x_offset, hex.y() + y_offset, hex.radius, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            if (draw_params.hex && draw_params.hex.stroke) {


                ctx.strokeStyle = draw_params.hex.stroke.color;
                ctx.lineWidth = draw_params.hex.stroke.width;
                ctx.beginPath();
                var x = hex.points[5].x() + x_offset;
                var y = hex.points[5].y() + y_offset;

                ctx.moveTo(x, y);
                hex.points.forEach(function (point) {
                    var x = point.x() + x_offset;
                    var y = point.y() + y_offset;
                    ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.stroke();

            }

        });

        return canvas;
    }

    /* -------------- EXPORT --------------- */

    if (typeof module != 'undefined') {
        module.exports = draw;
    }
})(window);