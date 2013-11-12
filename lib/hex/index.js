(function (w) {

    function _click_handler(cell) {
        var self = this;
        return function (event) {
            if (self.on_click) {
                self.on_click(cell);
            }
        }
    }

    function _down_handler(cell) {
        var self = this;
        return function (event) {
            if (self.on_down) {
                self.on_down(cell);
            }

        }
    }

    function _up_handler(cell) {
        var self = this;
        return function (event) {
            if (self.on_up) {
                self.on_up(cell);
            }

        }
    }
    function _over_handler(cell) {
        var self = this;
        return function (event) {
            if (self.on_over) {
                self.on_over(cell);
            }

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

        _.extend(grid_layer, {
            click_handler: _click_handler,
            down_handler: _down_handler,
            up_handler: _up_handler,
            over_handler: _over_handler,

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