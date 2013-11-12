(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.125, left: 5, top: 0, heavy_freq: 6};

        var _fill_color = _.template('rgb(<%= red %>,<%= green %>,255)');

        render_params.fill_color = function (cell) {
            var red = cell.row % 6 * 51;
            var green = cell.col % 6 * 51;

            return _fill_color({red: red, green: green})
        };

        var hex_layer = EASEL_MAP.hex_layer('back_hexes', map, {
            grid_params: {
                hex_size: 100, labels: true, label_increment: 2
            }
        });

        hex_layer.post_render = function (stage, render_params) {
            //        hex_layer.cache(stage);
        };

        hex_layer.on_click = function (cell) {
            console.log('clicked on cell ', cell);
            cell.fill_shape.graphics.clear();
            if (cell.color == 'black') {
                cell.fill_shape = cell.fill(hex_layer.fill_container, 'white', cell.fill_shape);
                cell.color = 'white';
            } else {
                cell.fill_shape = cell.fill(hex_layer.fill_container, 'black', cell.fill_shape);
                cell.color = 'black';
            }
            cell.fill_shape.updateCache();
            var stage = cell.fill_shape.getStage();
            if (stage) {
                stage.update();
            }

        };

        hex_layer.strokeIndex = 0;
/*
        hex_layer.on_down = function (cell) {
            console.log('cell down: ', cell);
            hex_layer.paint = true;
            ++hex_layer.strokeIndex;
            if (cell.color == 'black') {
                hex_layer.color = 'white';
            } else {
                hex_layer.color = 'black;'
            }
            this.on_over(cell);
        };

        hex_layer.on_over = function (cell) {
            if (!cell.strokeIndex) {
                cell.strokeIndex = -1;
            }
            if (hex_layer.paint && (cell.strokeIndex < hex_layer.strokeIndex)) {
                console.log('cell over: ', cell, hex_layer.strokeIndex);

                cell.fill_shape.graphics.clear();

                cell.fill_shape = cell.fill(hex_layer.fill_container, hex_layer.color, cell.fill_shape);
                cell.fill_shape.updateCache();
                cell.color = hex_layer.color;
                cell.strokeIndex == hex_layer.strokeIndex;

                var stage = cell.fill_shape.getStage();
                if (stage) {
                    stage.update();
                } else {
                    console.log('no_stage');
                }
                cell.strokeIndex = hex_layer.strokeIndex;
            }else if (hex_layer.paint){
                console.log('repeat stroke over ', cell, cell.strokeIndex)
            }
        };

        hex_layer.on_up = function (cell) {
            console.log('cell up: ', cell);

            hex_layer.paint = false;
        };*/

        map.render(render_params, $('canvas')[0]).enableMouseOver(true);

    })
})(window);