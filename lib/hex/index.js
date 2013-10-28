(function (w) {

    function _render(params) {

        return function (stage, render_params) {
            var gp = this.grid_params;
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});
            var scale = render_params.scale || 1;

            this.container.x = -render_params.left * scale;
            this.container.y = -render_params.top * scale;

            var map = {
                hex_size: gp.hex_size * scale,
                map_size: Math.max(stage.canvas.width, stage.canvas.height) * 2.25
            };

            var hexes = _.flatten(HEXAGONY.generate_hexes(map));
            this.hexes = hexes;
            console.log('hexes:', hexes);

            var hex_shape = new createjs.Shape();
            hex_shape.graphics.s(gp.line_color).ss(1 / scale);

            var x_offset = ( stage.canvas.width * scale / (-2)) - this.container.x;
            var y_offset = ( stage.canvas.height * scale / (-2)) - this.container.y;

            console.log('x offset: ', x_offset, 'y offset: ', y_offset);

            _.each(hexes, function (hex) {
                hex._x_offset = x_offset + render_params.left;
                hex._y_offset = y_offset + render_params.top;

                console.log('hex center: ', Math.round(hex.x()), Math.round(hex.y()));
                _.each(hex.points, function (point, i) {
                    if (i) {
                        hex_shape.graphics.lt(point.x() + x_offset, point.y() + y_offset);
                    } else {
                        hex_shape.graphics.mt(point.x() + x_offset, point.y() + y_offset);
                    }
                });

                hex_shape.graphics.lt(hex.points[0].x() + x_offset, hex.points[0].y() + y_offset);

                if (gp.labels &&
                    (!(hex.row % gp.label_increment))
                    &&
                    (!(hex.column % gp.label_increment))
                    ) {

                    coords = Math.round(hex.x() + x_offset) + ',' + Math.round(hex.y() + y_offset);

                    var label_shape = new createjs.Text(coords, (10/scale) + 'pt Sans-Serif', 'black');
                    label_shape.x = hex.x() + x_offset;
                    label_shape.y = hex.y() + y_offset;
                    label_shape.textAlign = 'center';
                    label_shape.textBaseline = 'middle';

                    this.container.addChild(label_shape);
                }
            }, this);

            this.container.addChild(hex_shape);



            this.container.scaleX = this.container.scaleY = scale;
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

        map.add_layer(grid_layer);

        return grid_layer

    };


})(window)