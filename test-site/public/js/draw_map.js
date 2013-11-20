(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.25, left: 5, top: 0, heavy_freq: 6};

        var _fill_color = _.template('rgb(<%= red %>,<%= green %>,255)');

        var perlin = new EASEL_MAP.util.Perlin();

        color_DB = [];

        var greys = [];

        perlin.generate([-100, -100], [200, 200], function (coords, value) {
            console.log(coords, value);
            greys.push({x: coords[0], y: coords[1], value: value});
        });

        greys = _.map( _.groupBy(greys, 'x'), function (values) {
            return {
                x: values[0].x,
                values: _.map(values, function (value) {
                    return _.pick(value, 'x', 'value');
                })
            };
        });

        render_params.fill_color = function (cell) {

            var x = cell.center_x();
            var y = cell.center_y();

            var x1 = Math.floor(x);
            var y1 = Math.floor(y);


            /*
             var color = _.find(color_DB, function (d) {
             return d.row == cell.row && d.col == cell.col;
             });

             if (color) return color.color;

             var red = cell.row % 6 * 51;
             var green = cell.col % 6 * 51;

             return _fill_color({red: red, green: green})*/
        };

        var hex_layer = EASEL_MAP.hex_layer('back_hexes', map, {
            grid_params: {
                hex_size: 100, labels: true, label_increment: 2
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

        $('#left').click(function () {
            render_params.left += 500;
            map.render(render_params, stage);
        })

        $('#right').click(function () {
            render_params.left -= 500;
            map.render(render_params, stage);
        });

        $('#zoom_in').click(function () {
            
            if (render_params.scale < 2){
                
            render_params.scale *= 2;
            map.render(render_params, stage);
            }
        });

        $('#zoom_out').click(function () {
            if (rende_params.scale > 0.125){
            render_params.scale /= 2;
            map.render(render_params, stage);
            }
        });

        $('#hex_size').change(function (e) {
            console.log('hex size', e, $(e.target).val());

        });

    })
})(window);
