(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale:0.125, left: 5, top: 0, heavy_freq: 6};

        var _fill_color = _.template('rgb(<%= red %>,<%= green %>,255)');

        render_params.fill_color = function(cell){
            var red = cell.row % 6 * 51;
            var green = cell.col % 6 * 51;

            return _fill_color({red: red, green: green})
        }

        var hex_layer = EASEL_MAP.hex_layer('back_hexes', map, {
            grid_params: {
                hex_size: 100, labels: true, label_increment: 2
            }
        });

        hex_layer.post_render = function (stage, render_params) {
        };

        map.render(render_params, $('canvas')[0]);
    })
})(window);