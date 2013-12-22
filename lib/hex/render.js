(function (window) {

    window.EASEL_MAP._proto.Hex_Layer = {
        /**
         * ensures that there is a grid_container that can be scaled.
         * within the grid container is grid_container_t that can be offset.
         * within grid_container_t are two containers,
         *   - the fill container and the outline container.
         *   - a fill_paint_container for faster drawing of strokes.
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

            var paint = new createjs.Container();
            this.grid_container_t.addChild(paint);
            this.paint_container = paint;

            var outlines = new createjs.Container();
            outlines.name = 'outlines';
            this.grid_container_t.addChild(outlines);
            this.outlines_container = outlines;


        },

        group_cells: function () {
            var self = this;
            this.fill_container.removeAllChildren();
            var groups = this.cells.reduce(function (out, cell) {

                if (!out[cell.ij_index()]) {
                    out[cell.ij_index()] = [];
                }

                out[cell.ij_index()].push(cell);

                return out;

            }, {});
        //    console.log('cells: ', this.cells.length);

            this.fill_group_containers = {};
            _.each(groups, function (cells, name) {
                var group_container = new createjs.Container();
                group_container.cells = cells;
                group_container.name = name;

                group_container.$event = function(name, e){
                    var cell = self.nearest_cell(group_container,e);
                    return cell.event(name, e);
                };

                this.fill_container.addChild(group_container);
                this.fill_group_containers[name] = group_container;

                cells.forEach(function (cell) {
                    group_container.addChild(cell.fill_shape);
                    cell.group_container = group_container;
                });

                this.set_gc_range(group_container, cells);

                group_container.cache(
                    group_container.$range.min_x,
                    group_container.$range.min_y,
                    group_container.$range.max_x - group_container.$range.min_x,
                    group_container.$range.max_y - group_container.$range.min_y
                );
                group_container.name = name;

            }, this);
            this.add_group_events();
        },

        set_gc_range: function (group_container, cells) {

            var cell = cells[0];

            var min_x = cell.fill_shape.x;
            var min_y = cell.fill_shape.y;
            var max_x = min_x;
            var max_y = min_y;

            _.each(cells, function (cell) {
                group_container.addChild(cell.fill_shape);
                cell.group_container = group_container;
                min_x = Math.min(min_x, cell.fill_shape.x);
                max_x = Math.max(max_x, cell.fill_shape.x);

                min_y = Math.min(min_y, cell.fill_shape.y);
                max_y = Math.max(max_y, cell.fill_shape.y);

            });

            min_x -= cell.hex_size;
            min_y -= cell.hex_size;
            max_y += 2 * cell.hex_size;
            max_x += 2 * cell.hex_size;
            group_container.$range = {
                min_x: min_x,
                max_x: max_x,
                min_y: min_y,
                max_y: max_y
            };
        },

        nearest_cell: function (container, e) {
            // console.log('target: ', e);
            var x, y;
            if (e.hasOwnProperty('stageX')){
                 x = e.stageX;
                 y = e.stageY;
            } else {
                 x = e.offsetX;
                 y = e.offsetY;
            }
            var target = container.globalToLocal(x, y);

            function _d(cell) {
                return   Math.abs(cell.center_x() - target.x) +
                    Math.abs(cell.center_y() - target.y);
            }

            return _.reduce(container.cells, function (out, cell) {
                if (!out) return cell;
                var distance = _d(cell);
                var out_distance = _d(out);
                return distance < out_distance ? cell : out;
            });
        },

        add_group_events: function () {
            var self = this;

            function _group_contains(container, e) {
                var target = container.globalToLocal(e.offsetX, e.offsetY);

                return container.$range.min_x <= target.x && container.$range.max_x >= target.x
                    && container.$range.min_y <= target.y && container.$range.max_y >= target.y;
            }

            function _group_event(name) {

                return function (e) {
                    _.each(self.fill_group_containers, function (container) {
                        if (_group_contains(container, e)) {
                            return container.$event(name, e);
                        } else {
                            return false;
                        }
                    });
                };
            }

            this.events.mousedown = _group_event('mousedown');
            this.events.mouseup = _group_event('mouseup');
            this.events.mousemove = _group_event('mousemove');


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
            var top_left_hex = new EASEL_MAP.class.Hex_Layer_Cell(0, 0, hex_size);

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

        render: function (stage, render_params) {
           // console.log('rendering hexes');
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});

            this.reset();
            this.render_sublayers(render_params);
            var goc = this.outlines_container;
            var range = this.cell_range(stage);
            var fc = this.fill_container;

            var min_x = this.grid_params.min_x;
            var max_x = this.grid_params.max_x;

            var top_left_hex = range.top_left_hex;
            var bottom_right_hex = range.bottom_right_hex;
            var self = this;
            _.each(_.range(top_left_hex.row, bottom_right_hex.row), function (row) {
                _.each(_.range(top_left_hex.col, bottom_right_hex.col), function (col) {
                    var cell = new EASEL_MAP.class.Hex_Layer_Cell(row, col, self.grid_params.hex_size);
                    var x = cell.center_x();
                    if ((x  >= min_x) && (x <= max_x)){
                        cell.render(render_params, fc, self);
                        self.cells.push(cell);
                    }
                })
            });
            var draw_scale = this.cells[0].draw_scale(render_params.scale);

            this.group_cells();

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