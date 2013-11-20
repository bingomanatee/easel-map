(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.25, left: 5, top: 0, heavy_freq: 6};

        var _fill_color = _.template('rgb(<%= Math.min(255, Math.max(0, red )) %>,<%= Math.min(255, Math.max(0, green )) %>, <%= Math.min(255, Math.max(0, blue )) %>)');
        var SEA_LEVEL = 100;

        color_DB = [];

        var greys = [];


        var perlin = new EASEL_MAP.util.Perlin_Canvas(7, 400, 300);

        perlin.render(720, 360);

        greys = _.map(_.groupBy(greys, 'x'), function (values) {
            return {
                x: values[0].x,
                values: _.map(values, function (value) {
                    return _.pick(value, 'x', 'value');
                })
            };
        });

        render_params.fill_color = function (cell) {

            var color = _.find(color_DB, function (d) {
                return d.row == cell.row && d.col == cell.col;
            });

            if (color) return color.color;

            var x = cell.center_x();
            var y = cell.center_y();

            var x1 = Math.floor(x/40) + 360;
            var y1 = Math.floor(y/40) + 180;

          //  console.log('x1: ', x1, 'y1: ', y1);
            var context = perlin.canvas.getContext('2d');
            var data = context.getImageData(x1, y1, 1, 1).data;
            var r, g, b;
            r = g = b = Math.round((data[0] - 120) * 2);
            if (b < SEA_LEVEL){
                r /= 2;
                g /= 2;
            } else {
                var scale = 512 - SEA_LEVEL;
               var green_margin = -20;
                var green_scale = 1.5;

                b = Math.floor(((b - SEA_LEVEL) * green_scale) + (SEA_LEVEL  + green_margin));
               // r = g;
            }

          //  console.log('color: ', r, g, b);
            return _fill_color({red: r, green: g, blue: b});
            /*

             var red = cell.row % 6 * 51;
             var green = cell.col % 6 * 51;

             return _fill_color({red: red, green: green})*/
        };

        var hex_layer = EASEL_MAP.hex_layer('back_hexes', map, {
            grid_params: {
                hex_size: 25, labels: true, label_increment: 2
            }
        });

        hex_layer.post_render = function (stage, render_params) {
            console.log('cell count: ', hex_layer.cells.length);
            _.each(hex_layer.cells, function (cell) {
                var color = _.find(color_DB, function (d) {
                    return cell.equals(d);
                });

                if (color) {
                    cell.color = color.color;
                }

                cell.events.mousedown = function (e) {
                    hex_layer.on_down(e, cell);
                }
                cell.events.mousemove = function (e) {
                    hex_layer.on_over(e, cell);
                }

                cell.events.mouseup = function (e) {
                    hex_layer.on_pressup(e, cell)
                }
            })
        };

        hex_layer.on_click_ = function (cell) { // disabled - being more granular
            console.log('clicked on cell ', cell, cell.color);
            function match(d) {
                return d.row == cell.row && d.col == cell.col;
            }

            var db_color = _.find(color_DB, match);

            if (db_color && db_color.color == 'black') {
                cell.color = db_color.color = 'white';
            } else {
                cell.color = 'black';
                color_DB.push(_.pick(cell, 'row', 'col', 'color'))
            }

            cell.render(render_params, hex_layer.fill_container);

            stage.update();

        };

        hex_layer.strokeIndex = 0;
        var last_cell = null;
        hex_layer.on_down = function (e, cell) {
            console.log('cell down: ', cell.row, cell.col);
            hex_layer.paint = true;
            ++hex_layer.strokeIndex;

            last_cell = null;
            hex_layer.on_over(e, cell);
        };

        function get_mid_cells(a, b) {
            if (a.equals(b)) {
                return [a];
            }
            var row = Math.round((a.row + b.row) / 2);
            var col = Math.round((a.col + b.col) / 2);
            var id = {row: row, col: col};
            if (a.equals(id) || b.equals(id)) {
                return [a, b];
            } else {
                var mid = _.find(hex_layer.cells, function (cell) {
                    return cell.equals(id);
                });

                if (mid) {
                    return _.uniq([a, b].concat(get_mid_cells(a, mid)).concat(get_mid_cells(mid, b)));
                } else {
                    return [a, b];
                }
            }
        }

        hex_layer.on_over = function (e, cell) {
            if (hex_layer.paint && ((!cell.strokeIndex) || (cell.strokeIndex < hex_layer.strokeIndex))) {

                console.log('cell over: ', cell.row, cell.col, hex_layer.strokeIndex);

                cell.strokeIndex = hex_layer.strokeIndex;
                function match(d) {
                    return cell.equals(d);
                }

                function color_cell(cell) {
                    console.log('coloring cell ', cell.row, cell.col)
                    var db_color = _.find(color_DB, match);

                    if (db_color && (!(db_color.color == 'black'))) {
                        cell.color = db_color.color = 'black';
                    } else {
                        cell.color = 'black';
                        color_DB.push(_.pick(cell, 'row', 'col', 'color'))
                    }
                    cell.render(render_params, hex_layer.paint_container);
                }


                if (last_cell && !last_cell.equals(cell)) {
                    var mid_cells = get_mid_cells(cell, last_cell);
                    _.each(mid_cells, color_cell);
                } else {
                    color_cell(cell);
                }

                var stage = cell.fill_shape.getStage();
                if (stage) {
                    stage.update();
                } else {
                    console.log('no_stage');
                }

                last_cell = cell;
            }
        };

        hex_layer.on_pressup = function (e, cell) {
            console.log('cell up: ', cell.row, cell.col);

            hex_layer.paint_container.removeAllChildren();
            hex_layer.paint = false;
            map.render(render_params, stage);
        };

        var canvas = $('canvas')[0];
        var stage = map.render(render_params, null, canvas);

        stage.enableMouseOver(true);

        var D = 100;

       function stat(){
           $('#left_value').text(render_params.left);
           $('#top_value').text(render_params.top);
           $('#scale_value').text(render_params.scale);
       }

        stat();

        $('#left').click(function () {
            render_params.left += D / render_params.scale;
            map.render(render_params, stage);
            stat();
        })

        $('#right').click(function () {
            render_params.left -= D / render_params.scale;
            map.render(render_params, stage);
            stat();
        });

        $('#up').click(function () {
            render_params.top += D / render_params.scale;
            map.render(render_params, stage);
            stat();
        })

        $('#down').click(function () {
            render_params.top -= D / render_params.scale;
            map.render(render_params, stage);
            stat();
        });

        $('#zoom_in').click(function () {

            if (render_params.scale < 2) {

                render_params.scale *= 2;
                map.render(render_params, stage);
            }
        });

        $('#zoom_out').click(function () {
            if (render_params.scale > 0.125) {
                render_params.scale /= 2;
                map.render(render_params, stage);
            }
        });

        $('#hex_size').change(function (e) {
            console.log('hex size', e, $(e.target).val());

        });

    })
})(window);
