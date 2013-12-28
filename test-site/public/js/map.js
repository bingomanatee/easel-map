(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.25, left: 5, top: 0, heavy_freq: 6, tile_width: 100, tile_height: 100, hex_size: 10};
        var MAP_GREY_RATIO = 10;

        var perlin_stage;

        var heightmap = window.make_heightmap(map, MAP_GREY_RATIO);

        // for testing - visualizing greymap
        $('.heightmap-show').append(heightmap.canvas);

        perlin_stage = new createjs.Stage(heightmap.canvas);
        perlin_stage.autoClear = false;

        var hex_cache = {
        };

        function _localize(event, offset) {
            var shape_layer_coords = shape_layer.offset_layer().globalToLocal(event.stageX, event.stageY);

            shape_layer_coords.x /= MAP_GREY_RATIO;
            shape_layer_coords.y /= MAP_GREY_RATIO;

            return shape_layer_coords;
        }

        var _land_color = _.template('hsl(0, 20%, <%= grey  %>%)');
        var _sea_color = _.template('hsl(180, 50%, <%= grey  %>%)');

        var SEA_LEVEL = 120;
        var MIN_LAND_GREY = 0.2;
        var MAX_SEA_BLUE = 0.7;

        function _p(v) {
            v = Math.round(100 * v);
            v -= v % 5;
            return v;
        }

        function _color_from_255(grey) {
            var is_sea = (grey < SEA_LEVEL);

            if (is_sea) {
                grey = grey / SEA_LEVEL;
                grey *= grey * MAX_SEA_BLUE;
                grey = _p(grey);
                return _sea_color({grey: grey});
            } else {
                grey = (grey - SEA_LEVEL) / (255 - SEA_LEVEL);
                grey *= grey;
                grey *= (1 - MIN_LAND_GREY);
                grey += MIN_LAND_GREY;
                grey = _p(grey);
                return _land_color({grey: grey});
            }
        }

        _.each(_.range(0, 10), function (ci) {
            var color = _color_from_255(255 * ci / 9);
            $('.swatches .color-' + ci).css('background-color', color);
        });

        function _get_cached_hex(color, radius) {
            if (!(hex_cache[color] && hex_cache[color][radius])) {
                if (!hex_cache[color]) {
                    hex_cache[color] = {};
                }
                hex_cache[color][radius] = window.EASEL_MAP.util.make_hex_cache(color, radius);
            }

            return hex_cache[color][radius];
        }

        var shape_layer = map.add_layer('shapes', {

            add_tile_shapes: function (tile) {
                //  console.log('drawing tile ', tile.i, 'x', tile.j, 'at', tile.layer.scale());
                var cell_radius = render_params.hex_size / this.scale();
                var back_fill = new createjs.Shape();

                if ((tile.i + tile.j) % 2) {
                    back_fill.graphics.f('rgb(204, 204, 255)');
                } else {
                    back_fill.graphics.f('rgb(204, 255, 255)');
                }
                back_fill.graphics.r(tile.left(), tile.top(), this.tile_width / this.scale(), this.tile_height / this.scale());
                tile.container().addChild(back_fill);
                var scale = this.scale();
                //    tile.container().addChild(hexagons);
                var hex_range = EASEL_MAP.util.draw_hex.hex_extent(tile.left(), tile.right(), tile.top(), tile.bottom(), cell_radius);
                ;
                _.each(_.range(hex_range.left - 1, hex_range.right + 1), function (col) {
                    _.each(_.range(hex_range.top - 1, hex_range.bottom + 1), function (row) {

                        var center = EASEL_MAP.util.draw_hex.placement(row, col, cell_radius);
                        var shade = heightmap.color(center.center_x / MAP_GREY_RATIO, center.center_y / MAP_GREY_RATIO);
                        var color = _color_from_255(shade);
                        var cached_hex = _get_cached_hex(color, cell_radius);

                        var hex_bm = new createjs.Bitmap(cached_hex.canvas);
                        hex_bm.x = center.center_x - cached_hex.canvas.width / 2;
                        hex_bm.y = center.center_y - cached_hex.canvas.height / 2;
                        tile.container().addChild(hex_bm);
                    });
                });


                var boundry_rect = new createjs.Shape();
                boundry_rect.graphics.s('red').ss(2).dr(tile.left(), tile.top(), tile.width(), tile.height());
                tile.container().addChild(boundry_rect);

                var text = new createjs.Text(tile.i + 'x' + tile.j, (20 / this.scale()) + 'pt Arial', 'red');
                text.x = tile.left() + 10 / this.scale();
                text.y = tile.top() + 10 / this.scale();
                tile.container().addChild(text);
            },
            events: {
                mousemove: function (event) {
                    var shape_layer_coords = _localize(event);

                    $('.cursor').css('left', shape_layer_coords.x + 'px');
                    $('.cursor').css('top', shape_layer_coords.y + 'px');
                },

                pressmove: function (event) {
                    var shape = new createjs.Shape();
                    var shape_layer_coords = _localize(event);

                    var grey = Math.round($('#height-range').val());
                    console.log('grey: ', grey);

                    var brush_size = parseFloat($('#brush-size').val());
                    var opacity = parseFloat($('#opacity').val());

                    $('.cursor').show().css('left', shape_layer_coords.x + 'px').css('top', shape_layer_coords.y + 'px');

                    shape.graphics.f('rgba(' + grey + ',' + grey + ',' + grey + ',' + opacity + ')').dc(0, 0, Math.max(4, brush_size * 5 / shape_layer.scale())).ef();
                    shape.graphics.f('rgba(' + grey + ',' + grey + ',' + grey + ',' + opacity + ')').dc(0, 0, Math.max(4, brush_size * 2 / shape_layer.scale())).ef();

                    _.extend(shape, shape_layer_coords);

                    perlin_stage.addChild(shape);
                    perlin_stage.update();
                    perlin_stage.removeChild(shape);
                },

                pressup: function () {
                    map.refresh();
                    map.render(render_params, stage);
                    $('.cursor').hide();
                }
            }
        });

        canvas = $('canvas')[0];
        var stage = map.render(render_params, null, canvas);

        window.map_ui(map, render_params, stage);

    })
})(window);
