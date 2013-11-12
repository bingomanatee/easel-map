(function (window) {

    EASEL_MAP._proto.hex_layer = {
        /**
         * ensures that there is a grid_container that can be scaled.
         * within the grid container is grid_container_t that can be offset.
         * within grid_container_t are two containers,
         *   - the fill container and the outline container.
         *   - the outline can be cached every time the position/scale has not changed.
         * @returns {Container}
         *
         * @param stage {createjs.Stage}
         * @param params {Object}
         * @returns {Container|*}
         */
        reset: function (stage, params) {
            if (this.grid_container) {
                this.grid_container_t.removeAllChildren();
            } else {
                this.grid_container = new createjs.Container();
                this.grid_container.name = 'grid';
                this.container.addChild(this.grid_container);

                this.grid_container_t = new createjs.Container();
                this.grid_container_t.name = 'grid_t';
                this.grid_container.addChild(this.grid_container_t);
            }

            var fills = new createjs.Container();
            fills.name = 'fills';
            this.grid_container_t.addChild(fills);
            this.fill_container = fills;

            var outlines = new createjs.Container();
            outlines.name = 'outlines';
            this.grid_container_t.addChild(outlines);
            this.outlines_container = outlines;
        },

        group_cells: function () {

            this.fill_container.removeAllChildren();
            var groups = this.cells.reduce(function (out, cell) {

                if (!out[cell.ij_index()]) {
                    out[cell.ij_index()] = [];
                }

                out[cell.ij_index()].push(cell);

                return out;

            }, {});
            console.log('cells: ', this.cells.length);

            this.fill_group_containers = {};
            _.each(groups, function (cells, name) {
                var group_container = new createjs.Container();

                var cell = cells[0];

                var min_x = cell.fill_shape.x;
                var min_y = cell.fill_shape.y;
                var max_x = min_x;
                var max_y = min_y;

                cells.forEach(function (cell) {
                    group_container.addChild(cell.fill_shape);
                    cell.group_container = group_container;
                    group_container.name = name;

                    min_x = Math.min(min_x, cell.fill_shape.x);
                    max_x = Math.max(max_x, cell.fill_shape.x);

                    min_y = Math.min(min_y, cell.fill_shape.y);
                    max_y = Math.max(max_y, cell.fill_shape.y);
                //    cell.updateCache();
                });

                min_x -= cell.hex_size;
                min_y -= cell.hex_size;
                max_y += cell.hex_size;
                max_x += cell.hex_size;
                // console.log('caching group ', name, min_x, min_y, max_x - min_x, max_y - min_y);
                group_container.cache(min_x, min_y, max_x - min_x, max_y - min_y);
                this.fill_container.addChild(group_container);
                this.fill_group_containers[name] = group_container;
                group_container.name = name;
            }, this);
        },

        cell_range: function (stage, render_params) {
            var moved = false;
            if (this._last_rp) {
                moved = true;
            }

            var goc = this.outlines_container;
            var gc = this.grid_container;
            var gp = this.grid_params;
            if (moved) { //@TODO: more granular comparison
                goc.removeAllChildren();
                goc.uncache();
                gc.removeAllChildren();
            }
            this._last_rp = render_params;
            var cells = [];
            this.cells = cells;

            var hex_size = this.grid_params.hex_size;
            var top_left_hex = new EASEL_MAP.class.Hex_Cell(0, 0, hex_size);

            var offset = goc.localToGlobal(0, 0);
            var est_row = Math.ceil(offset.y / top_left_hex.row_unit() * -1);
            var est_col = Math.ceil(offset.x / top_left_hex.col_unit() * -1);

            top_left_hex.row = est_row;
            top_left_hex.col = est_col;


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

            var bottom_right_hex = top_left_hex.clone();
            while (bottom_right_hex.global(goc).x < stage.canvas.width) {
                ++bottom_right_hex.col;
            }
            while (bottom_right_hex.global(goc).y < stage.canvas.height) {
                ++bottom_right_hex.row;
            }
            ++bottom_right_hex.row;
            ++bottom_right_hex.col;

            return {
                top_left_hex: top_left_hex,
                bottom_right_hex: bottom_right_hex,
                rows: bottom_right_hex.row - top_left_hex.row + 1,
                cols: bottom_right_hex.col - top_left_hex.col + 1
            }
        },

        render_sublayers: function (render_params) {
            var scale = render_params.scale || 1;
            var gc = this.grid_container;
            gc.scaleX = gc.scaleY = scale;
            var gct = this.grid_container_t;
            gct.x = render_params.left;
            gct.y = render_params.top;

        },

        draw_scale: function (s) {
            var size = s * this.grid_params.hex_size;
            console.log('size: ', size);
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

        render: function (stage, render_params) {
            console.log('rendering hexes');
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});

            this.reset();
            this.render_sublayers(render_params);
            var goc = this.outlines_container;
            var range = this.cell_range(stage);
            var fc = this.fill_container;

            var top_left_hex = range.top_left_hex;
            var bottom_right_hex = range.bottom_right_hex;

            var self = this;
            var draw_scale = this.draw_scale(render_params.scale);
            _.each(_.range(top_left_hex.row, bottom_right_hex.row), function (row) {
                _.each(_.range(top_left_hex.col, bottom_right_hex.col), function (col) {
                    var cell = new EASEL_MAP.class.Hex_Cell(row, col, self.grid_params.hex_size);
                    var color = cell.fill_color(render_params);

                    switch (draw_scale) {
                        case 3:
                            cell.outline(goc, cell.stroke_color(render_params), cell.stroke_width(render_params), null, render_params.scale);
                            cell.fill_shape = cell.fill(fc, color, null, render_params.scale);
                            break;

                        case 2:
                            cell.fill_shape = cell.fill(fc, color, null, render_params.scale);
                            break;

                        case 1:
                            cell.fill_shape = cell.circle_fill(fc, color, null, render_params.scale);
                            break;

                        default:
                            cell.fill_shape = cell.circle_fill(fc, color, null, render_params.scale);

                    }
                    cell.fill_shape.on('click', self.click_handler(cell));
                    self.cells.push(cell);
                })
            });

            if (this.cells.length > 100) {
             //   this.group_cells();
            }

            var tl = goc.globalToLocal(0, 0);
            var wh = goc.globalToLocal(stage.canvas.width, stage.canvas.height);

            // caching outline layer
            if (draw_scale > 1)   goc.cache(
                Math.floor(tl.x),
                Math.floor(tl.y),
                Math.ceil(wh.x - tl.x) + 2,
                Math.ceil(wh.y - tl.y) + 2
                , render_params.scale);
            // fc.cache(Math.floor(tl.x), Math.floor(tl.y), Math.ceil(wh.x - tl.x) + 2, Math.ceil(wh.y - tl.y) + 2);
        }


    }

})(window);