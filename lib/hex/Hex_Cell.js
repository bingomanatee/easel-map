(function () {

    function _rc() {
        return _.shuffle(['red', 'green', 'blue', 'cyan', 'magenta', 'orange'])[0];
    }

    var COS_30 = Math.cos(Math.PI / 6);
    var SIN_30 = Math.sin(Math.PI / 6);
    var COS_30_x_2 = COS_30 * 2;
    var COS_30_x_3 = COS_30 * 3;
    var COS_30_x_3_div_2 = COS_30 * 3 / 2;
    var COS_30_div_2 = COS_30 / 2;

    var CACHED_HEXES = {};

    /**
     * Hex_Cell is a polygon circumscribed in a circle
     * defined by its center and hex_size radius.
     *
     * The center is computed by its position on a "jagged grid".
     * The hexagon's points are aligned so that they start at the left
     * and right corners (3 and 9 o'clock), so it's flat on the top and bottom.
     *
     * @param i - the index of the row(x) position
     * @param j - the index of the column (y) position
     * @param hex_size - the distance from the center to any point.
     * @constructor
     */

    EASEL_MAP.class.Hex_Cell = function (i, j, hex_size) {
        this.hex_size = hex_size;
        this.row = i;
        this.col = j;
        this.events = {};
    };


    EASEL_MAP.class.Hex_Cell.prototype = {

        event: function (name, e) {
            if (this.events[name]) {
          //      console.log('handling cell event ', name);
                return this.events[name](e);
            } else {
            //    console.log('NOT handling cell event', name);
                return false;
            }
        },

        calc_points: function (scale) {
            if (!scale) scale = 1;
            if (this.points) {
                return this.points;
            }
            var xs = [
                -this.hex_size * scale,
                -this.hex_size * SIN_30 * scale,
                this.hex_size * SIN_30 * scale,
                this.hex_size * scale
            ];

            var ys = [
                -this.hex_size * COS_30 * scale,
                0,
                this.hex_size * COS_30 * scale];

            this.points = [
                {x: xs[0], y: ys[1]} ,
                {x: xs[1], y: ys[0]},
                {x: xs[2], y: ys[0]},
                {x: xs[3], y: ys[1]},
                {x: xs[2], y: ys[2]},
                {x: xs[1], y: ys[2]}
            ];

            // console.log('points: ', this.points);
            return this.points;
        },

        ij_index: function () {
            return Math.floor(this.row / 10) + '_' + Math.floor(this.col / 10);
        },

        center: function () {
            return {x: this.center_x(), y: this.center_y()};
        },

        clone: function () {
            return new EASEL_MAP.class.Hex_Cell(this.row, this.col, this.hex_size);
        },

        circle_fill: function (container, color, shape, scale, cache) {
            var refresh = (!shape) || (!shape.graphics);
            if (refresh) {
                shape = new createjs.Shape();
                shape.x = this.center_x();
                shape.y = this.center_y();
                shape.graphics.clear();
                container.addChild(shape);
            }
            shape.graphics.f(color);

            shape.graphics.dc(0, 0, this.hex_size * ((1 + COS_30) / 2));

            if (refresh) {
                var extent = Math.ceil(this.hex_size) + 1;
                if (cache) shape.cache(-extent, -extent, 2 * extent, 2 * extent, scale);
            }

            return shape;
        },

        outline: function (container, color, width, scale) {
            var shape = new createjs.Shape();
            var text = new createjs.Text(this.row + ',' + this.col, (this.hex_size / 2) + 'px Arial', 'black');
            text.x = shape.x = this.center_x();
            text.y = shape.y = this.center_y();
            shape.graphics.ss(width, 'round', 10, true).s(color);
            var points = this.calc_points();

            shape.graphics.mt(_.last(points).x, _.last(points).y);
            _.each(points, function (point) {
                shape.graphics.lt(point.x, point.y);

            });
            shape.graphics.es();
            // container.addChild(text);
            container.addChild(shape);
            return shape;
        },

        _make_hex: function (color) {
            var shape = new createjs.Shape();
            shape.graphics.f(color);
            var points = this.calc_points();

            shape.graphics.mt(_.last(points).x, _.last(points).y);
            _.each(points, function (point) {
                shape.graphics.lt(point.x, point.y);

            });

            var extent = Math.ceil(this.hex_size) + 1;

            shape.cache(-extent, -extent, 2 * extent, 2 * extent);
            CACHED_HEXES[color] = shape.cacheCanvas;
        },


        draw_scale: function (scale) {
            var size = scale * this.hex_size;
            if (size > 50) {
                return 3;
            } else if (size > 20) {
                return 2;
            } else if (size > 10) {
                return 1;
            } else {
                return 0;
            }
        },

        render: function (render_params, fc, events) {
            var color = this.fill_color(render_params);
            var scale = render_params.scale;
            var goc = this.outlines_container;
            switch (this.draw_scale(scale)) {
                case 3:
                    this.outline(goc, this.stroke_color(render_params), this.stroke_width(render_params), null, scale);
                    this.fill_shape = this.fill(fc, color, null, scale);
                    break;

                case 2:
                    this.fill_shape = this.fill(fc, color, null, scale);
                    break;

                case 1:
                    this.fill_shape = this.circle_fill(fc, color, null, scale);
                    break;

                default:
                    this.fill_shape = this.circle_fill(fc, color, null, scale);

            }
        },

        equals: function (cell) {
            return cell.row == this.row && cell.col == this.col;
        },

        add_events: function (events) {
            var cell = this;
            this.fill_shape.removeAllEventListeners();

            if (events.on_click) {
                this.fill_shape.addEventListener('click', function (e) {
                    events.on_click(e, cell);
                });
            }
            if (events.on_down) {
                this.fill_shape.addEventListener('mousedown', function (e) {
                    events.on_down(e, cell);
                });
            }
            if (events.on_up) {
                this.fill_shape.addEventListener('mouseup', function (e) {
                    events.on_up(e, cell);
                });
            }
            if (events.on_pressup) {
                this.fill_shape.addEventListener('pressup', function (e) {
                    events.on_pressup(e, cell);
                });
            }
            if (events.on_over) {
                this.fill_shape.addEventListener('mouseover', function (e) {
                    events.on_over(e, cell);
                });
            }
        },

        fill: function (container, color, shape, scale, cache) {

            if (!CACHED_HEXES[color]) {
                this._make_hex(color);
            }

            var refresh = (!shape) || (!shape.image);
            if (refresh) {
                shape = new createjs.Bitmap(CACHED_HEXES[color]);
                shape.x = this.center_x() - (this.hex_size );
                shape.y = this.center_y() - (this.hex_size);
                container.addChild(shape);
            } else {
                shape.image = CACHED_HEXES[color].image;
            }
            return shape;
        },

        bound: function (shape) {
            shape.setBounds(Math.floor(this.center_x() - this.hex_size) - 1,
                Math.floor(this.center_y() - this.hex_size * COS_30) - 1,
                2 * Math.ceil(this.hex_size) + 2,
                2 * Math.ceil(COS_30 * this.hex_size) + 2
            )
            return shape.getBounds();
        },

        center_x: function () {
            return this.col * this.col_unit();
        },

        col_unit: function () {
            return this.hex_size * (1 + SIN_30);
        },

        row_unit: function () {
            return this.hex_size * (2 * COS_30);
        },

        center_y: function () {
            var k = this.row;
            if (this.col % 2) {
                k -= 0.5;
            }
            return k * this.row_unit();
        },

        global: function (container) {
            return container.localToGlobal(this.center_x(), this.center_y());
        },

        stroke_color: function (render_params) {
            if (render_params.stroke_color) {
                if (_.isFunction(render_params.stroke_color)) {
                    return render_paramms.stroke_color(this);
                } else {
                    return render_params.stroke_color;
                }
            } else {
                return 'black';
            }
        },

        fill_color: function (render_params) {
            if (render_params.fill_color) {
                if (_.isFunction(render_params.fill_color)) {
                    return render_params.fill_color(this);
                } else {
                    return render_params.fill_color;
                }
            } else {
                return 'grey';
            }
        },

        stroke_width: function (render_params) {
            var base = 1;
            if (render_params.stroke_width) {
                if (_.isFunction(render_params.stroke_width)) {
                    base = render_paramms.stroke_width(this);
                } else {
                    base = render_params.stroke_width;
                }
            }
            return base;// / render_params.scale;
        }

    };

})(window);