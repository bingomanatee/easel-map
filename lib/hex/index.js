(function (w) {

    var COS_30 = Math.cos(Math.PI / 6);
    var SIN_30 = Math.sin(Math.PI / 6);
    var COS_30_x_2 = COS_30 * 2;
    var COS_30_x_3 = COS_30 * 3;
    var COS_30_x_3_div_2 = COS_30 * 3 / 2;
    var COS_30_div_2 = COS_30 / 2;

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

    function Hex_Cell(i, j, hex_size, points) {
        this.hex_size = hex_size;
        this.row = i;
        this.col = j;

        if (!points) {
            this.calc_points();
        } else {
            this.points = points;
        }
    }

    function _rc() {
        return _.shuffle(['red', 'green', 'blue', 'cyan', 'magenta', 'orange'])[0];
    }


    Hex_Cell.prototype = {
        calc_points: function () {
            var xs = [
                -this.hex_size,
                -this.hex_size * SIN_30,
                this.hex_size * SIN_30,
                this.hex_size
            ];

            var ys = [
                -this.hex_size * COS_30,
                0,
                this.hex_size * COS_30];

            this.points = [
                {x: xs[0], y: ys[1]} ,
                {x: xs[1], y: ys[0]},
                {x: xs[2], y: ys[0]},
                {x: xs[3], y: ys[1]},
                {x: xs[2], y: ys[2]},
                {x: xs[1], y: ys[2]}
            ]
        },

        center: function () {
            return {x: this.center_x(), y: this.center_y()};
        },

        clone: function () {
            return new Hex_Cell(this.row, this.col, this.hex_size);
        },

        draw_circle: function (container) {
            var shape = new createjs.Shape();
            var text = new createjs.Text(this.row + ',' + this.col, this.hex_size + 'px Arial', 'black');
            text.x = shape.x = this.center_x();
            text.y = shape.y = this.center_y();
            text.textAlign = 'center';
            text.textBaseline = 'bottom';

            shape.graphics.s(_rc()).dc(0, 0, this.hex_size)
                .mt(0, -this.hex_size).lt(0, this.hex_size)
                .mt(-this.hex_size, 0).lt(this.hex_size, 0)
                .mt(-this.hex_size * COS_30 / 2, -this.hex_size * COS_30)
                .lt(this.hex_size * COS_30 / 2, this.hex_size * COS_30)
                .mt(this.hex_size * COS_30 / 2, -this.hex_size * COS_30)
                .lt(-this.hex_size * COS_30 / 2, this.hex_size * COS_30)
                .es();
            container.addChild(text);
            container.addChild(shape);
        },
        outline: function (container, color, width) {
            var shape = new createjs.Shape();
            var text = new createjs.Text(this.row + ',' + this.col, (this.hex_size / 2) + 'px Arial', 'black');
            text.x = shape.x = this.center_x();
            text.y = shape.y = this.center_y();
            shape.graphics.ss(width).s(color);
            var points = this.points;

            shape.graphics.mt(_.last(points).x, _.last(points).y);
            _.each(points, function (point) {
                shape.graphics.lt(point.x, point.y);

            });
            shape.graphics.es();
            // container.addChild(text);
            container.addChild(shape);
        },

        fill: function (container, color) {
            var shape = new createjs.Shape();
            shape.graphics.f(color);
            shape.x = this.center_x();
            shape.y = this.center_y();
            var points = this.points;

            shape.graphics.mt(_.last(points).x, _.last(points).y);
            _.each(points, function (point) {
                shape.graphics.lt(point.x, point.y);

            });
            shape.graphics.es();
            // container.addChild(text);
            container.addChild(shape);
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
            return base / render_params.scale;
        }

    };

    function _render(params) {
        return function (stage, render_params) {
            console.log('rendering ');
            var gp = this.grid_params;
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});
            var scale = render_params.scale || 1;

            var gc = this.ensure_grid_container();
            gc.scaleX = gc.scaleY = scale;
            var goc = this.outlines_container;
            var fc = this.fill_container;
            goc.x = render_params.left;
            goc.y = render_params.top;
            var cells = [];
            this.cells = cells;

            var hex_size = this.grid_params.hex_size;
            var top_left_hex = new Hex_Cell(0, 0, hex_size);

            var offset = goc.localToGlobal(0, 0);
            var est_col = Math.ceil(offset.x / top_left_hex.col_unit() * -1);
            var est_row = Math.ceil(offset.y / top_left_hex.row_unit() * -1);

            top_left_hex.row = est_row;
            top_left_hex.col = est_col;

            goc.removeAllChildren();

            do {
                ++top_left_hex.col
            } while (top_left_hex.global(goc).x <= 0);
            do {
                ++top_left_hex.row
            } while (top_left_hex.global(goc).y <= 0);

            while (top_left_hex.global(goc).x > 0) {
                --top_left_hex.col;
            }
            while (top_left_hex.global(goc).y > 0) {
                --top_left_hex.row;
            }
            --top_left_hex.col;
            --top_left_hex.col;

            top_left_hex.draw_circle(goc);

            var bottom_right_hex = top_left_hex.clone();
            while (bottom_right_hex.global(goc).x < stage.canvas.width) {
                ++bottom_right_hex.col;
            }
            while (bottom_right_hex.global(goc).y < stage.canvas.height) {
                ++bottom_right_hex.row;
            }
            ++bottom_right_hex.row;
            ++bottom_right_hex.col;

            _.each(_.range(top_left_hex.row, bottom_right_hex.row), function (row) {
                _.each(_.range(top_left_hex.col, bottom_right_hex.col), function (col) {
                    var cell = new Hex_Cell(row, col, hex_size);
                    cell.outline(goc, cell.stroke_color(render_params), cell.stroke_width(render_params));
                    var color = cell.fill_color(render_params);
                    console.log('color: ', color, 'cell: ', cell.row, cell.col);
                    cell.fill(fc, color);
                    cells.push(cell);
                })
            });

        }
    }

    var _default_grid_params = {
        hex_size: 50,
        labels: true,
        label_increment: 6,
        line_color: 'rgb(51,153,255)',
        axis_line_color: 'rgb(255,51,204)',
        heavy_line_color: 'rgb(0,0,102)'
    };
    EASEL_MAP.hex_layer = function (name, map, params) {
        if (!params) {
            params = {grid_params: {}};
        } else if (!params.grid_params) {
            params.grid_params = {};
        }

        _.defaults(params.grid_params, _default_grid_params);

        var grid_layer = new EASEL_MAP.Layer(name, map, params);

        grid_layer.render = _render(params);

        /**
         * ensures that there is a grid container that can be scaled, offset, etc;
         * within that container are two containers,
         *   - the fill container and the outline container.
         *   - the outline can be cached every time the position/scale has not changed.
         * @returns {Container}
         *
         * @param stage {createjs.Stage}
         * @param params {Object}
         * @returns {Container|*}
         */
        grid_layer.ensure_grid_container = function (stage, params) {
            if (!this.grid_container) {
                this.grid_container = new createjs.Container();
                this.grid_container.name = 'grid';
                this.container.addChild(this.grid_container);

                var fills = new createjs.Container();
                fills.name = 'fills';
                this.grid_container.addChild(fills);
                this.fill_container = fills;

                var outlines = new createjs.Container();
                outlines.name = 'fills';
                this.grid_container.addChild(outlines);
                this.outlines_container = outlines;
            } else { //@TODO: remove if caching is implemented
                this.fill_container.removeAllChildren();
                this.outlines_container.removeAllChildren();
            }

            return this.grid_container;
        }

        grid_layer.pre_render = function (stage, params) {
            this.ensure_grid_container(stage, params);
        };
        grid_layer.post_render = function (stage, params) {
        };

        map.add_layer(grid_layer);

        return grid_layer

    };


})(window);