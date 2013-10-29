(function (w) {

    function _render(params) {
        return function (stage, render_params) {
            console.log('rendering ');
            var gp = this.grid_params;
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});
            var scale = render_params.scale || 1;

            this.container.x = -render_params.left * scale;
            this.container.y = -render_params.top * scale;

          var label_layer =  this.label_layer = new createjs.Container();

            console.log('container.x: ', this.container.x, 'y', this.container.y);
            var map = {
                hex_size: gp.hex_size,
                map_size: Math.max(stage.canvas.width, stage.canvas.height) * 2.25/scale
            };

            var hexes = _.flatten(HEXAGONY.generate_hexes(map));
            this.hexes = hexes;
            console.log('hexes:', hexes);

            var hex_shape = new createjs.Shape();
            hex_shape.graphics.s(gp.line_color).ss(1 / scale);

            var axis_shape = new createjs.Shape();
            axis_shape.graphics.s(gp.axis_line_color).ss(1 / scale);

            var heavy_shape = new createjs.Shape();
            heavy_shape.graphics.s(gp.heavy_line_color).ss(1 / scale);

            var first_hex = hexes[0];
            var original_row = first_hex.row;
            var original_column = first_hex.column;
            var rep_limit = 100;


            while ((--rep_limit > 0) && (first_hex.y() <= -render_params.top)) {
                first_hex.row += 2;
                console.log('adjusted first hex: row:', first_hex.row, 'column:', first_hex.column, 'x: ', first_hex.x(), 'y:', first_hex.y());
            }

            while ((--rep_limit > 0) && (first_hex.y() > -render_params.top)) {
                first_hex.row -= 2;
                console.log('adjusted first hex: row:', first_hex.row, 'column:', first_hex.column, 'x: ', first_hex.x(), 'y:', first_hex.y());
            }

            while ((--rep_limit > 0) && ( first_hex.x() <= -render_params.left)) {
                first_hex.column += 1;
                console.log('adjusted first hex: row:', first_hex.row, 'column:', first_hex.column, 'x: ', first_hex.x(), 'y:', first_hex.y());
            }

            while ((--rep_limit > 0) && (first_hex.x() > -render_params.left)) {
                first_hex.column -= 1;
                console.log('adjusted first hex: row:', first_hex.row, 'column:', first_hex.column, 'x: ', first_hex.x(), 'y:', first_hex.y());
            }

            var column_offset = original_column - first_hex.column;
            var row_offset = original_row - first_hex.row;

            first_hex.column = original_column;
            first_hex.row = original_row;

            _.each(hexes, function (hex) {

                hex.row += row_offset;
                hex.column += column_offset;
                if (hex.column > 0 && (hex.column %2)){
                    -- hex.row;
                }

                var shape = hex_shape;

                if (hex.row == 0 || hex.column == 0) {
                    shape = axis_shape;
                } else if ((render_params.heavy_freq) && ((!(hex.row % render_params.heavy_freq)) || (!(hex.column % render_params.heavy_freq)))){
                    shape = heavy_shape;
                }

                //  console.log('hex center: ', Math.round(hex.x()), Math.round(hex.y()));
                _.each(hex.points, function (point, i) {
                    if (i) {
                        shape.graphics.lt(point.x(), point.y());
                    } else {
                        shape.graphics.mt(point.x(), point.y());
                    }
                });

                shape.graphics.lt(hex.points[0].x(), hex.points[0].y());

                if (gp.labels &&
                    (!(hex.row % gp.label_increment))
                    &&
                    (!(hex.column % gp.label_increment))
                    ) {

                    coords = hex.column + ',' + hex.row;

                    var label_shape = new createjs.Text(coords, (10 / scale) + 'pt Sans-Serif', 'black');
                    label_shape.x = hex.x();
                    label_shape.y = hex.y();
                    label_shape.textAlign = 'center';
                    label_shape.textBaseline = 'middle';

                    label_layer.addChild(label_shape);
                }
            }, this);

          //  hex_shape.cache(render_params.left, render_params.top, stage.canvas.width , stage.canvas.height);
            heavy_shape.cache(render_params.left, render_params.top, stage.canvas.width, stage.canvas.height);
            axis_shape.cache(render_params.left, render_params.top, stage.canvas.width, stage.canvas.height);
            label_layer.cache(render_params.left, render_params.top, stage.canvas.width, stage.canvas.height);
            this.container.addChild(hex_shape);
            this.container.addChild(heavy_shape);
            this.container.addChild(axis_shape);
            this.container.addChild(label_layer);

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