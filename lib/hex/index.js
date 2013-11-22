(function (w) {

    var _default_grid_params = {
        hex_size: 50,
        labels: true,
        label_increment: 6,
        line_color: 'rgb(51,153,255)',
        axis_line_color: 'rgb(255,51,204)',
        heavy_line_color: 'rgb(0,0,102)',
        min_x: -6000,
        max_x: 6000
    };

    EASEL_MAP.hex_layer = function (name, map, params) {
        if (!params) {
            params = {grid_params: {}};
        } else if (!params.grid_params) {
            params.grid_params = {};
        }

        _.defaults(params.grid_params, _default_grid_params);

        var grid_layer = new EASEL_MAP.Layer(name, map, params);

        _.extend(grid_layer, {

            pre_render: function (stage, params) {
                this.reset(stage, params);
            },

            post_render: function (stage, params) {
            }
        });

        _.extend(grid_layer, EASEL_MAP._proto.hex_layer);

        map.add_layer(grid_layer);

        return grid_layer

    };


})(window);