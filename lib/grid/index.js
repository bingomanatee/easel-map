(function (root) {

    function _render(params) {

        return function (stage, render_params) {
            var gp = this.grid_params;
            var scale = render_params.scale || 1;

            var gridline_shape = new createjs.Shape();
            gridline_shape.graphics.s(gp.line_color).ss(1 / scale);
            var axis_shape = new createjs.Shape();
            axis_shape.graphics.s(gp.axis_line_color).ss(2 / scale);

            if (render_params.heavy_freq){
                var gridline_h_shape = new createjs.Shape();
                gridline_h_shape.graphics.s(gp.heavy_line_color).ss(1 / scale);

                this.container.addChild(gridline_h_shape);
            }

            var grid_extent = EASEL_MAP.util.grid_extent(
                gp.unit, scale,
                stage.canvas.width, stage.canvas.height,
                render_params.left,
                render_params.top
            );

            var top = grid_extent.top_j * gp.unit;
            var bottom = grid_extent.bottom_j * gp.unit;
            var left = grid_extent.left_i * gp.unit;
            var right = grid_extent.right_i * gp.unit;

            console.log('render_params:', render_params, 'grid params: ', gp, ', grid extent:', grid_extent);

            for (var i = grid_extent.left_i; i <= grid_extent.right_i; ++i) {

                var x = i * gp.unit;
                console.log('drawing gridline at ', x);

                (i == 0 ? axis_shape : (
                    render_params.heavy_freq && (!(i % render_params.heavy_freq)) ?  gridline_h_shape: gridline_shape
                    )).graphics.mt(x, top).lt(x, bottom);
            }
            for (var j = grid_extent.top_j  ; j <= grid_extent.bottom_j; ++j) {

                var y = j * gp.unit;
                console.log('drawing gridline at y ', y);

                (j == 0 ? axis_shape : (
                    render_params.heavy_freq && (!(j % render_params.heavy_freq)) ?  gridline_h_shape: gridline_shape
                    )).graphics.mt(left, y).lt(right, y);
            }


            this.container.addChild(gridline_shape);
            this.container.addChild(axis_shape);
            this.container.x = -render_params.left * scale;
            this.container.y = -render_params.top * scale;

            this.container.scaleX = this.container.scaleY = scale;
        }
    }

    var _default_grid_params = {
        unit: 50,
        line_color: 'rgb(51,153,255)',
        axis_line_color: 'rgb(255,51,204)',
        heavy_line_color:'rgb(0,0,102)'
    };

    root.EASEL_MAP.grid_layer = function (name, map, params) {
        if (!params){
            params = {grid_params: {}};
        } else if (!params.grid_params){
            params.grid_params = {};
        }

        _.defaults(params.grid_params, _default_grid_params);

        var grid_layer = new EASEL_MAP.Layer(name, map, params);

        grid_layer.render = _render(params);

        map.add_layer(grid_layer);

        return grid_layer

    };


})(typeof(window) == 'undefined' ? this : window);