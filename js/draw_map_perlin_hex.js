(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.25, left: 5, top: 0, heavy_freq: 6, tile_width: 100, tile_height: 100};
        var MAP_GREY_RATIO = 10;
        var shape_layer = map.add_layer('shapes');

        var hex_size = 10;

        var _grey_color = _.template('hsl(0, 0%, <%= grey %>%)');

        function grey_from_255(grey) {
            grey *= 100 / 255;
            return _grey_color({grey: grey});
        }

        var caches_hex_shapes = [];

        function _hex_cache(radius) {
            var old_cache = _.find(caches_hex_shapes, function (cache) {
                return cache.radius == radius;
            });

            if (!old_cache) {
                old_cache = {
                    radius: radius, hexes: []
                };
                caches_hex_shapes.push(old_cache);
            }

            return old_cache;
        }

        function _hex_shape(row, column, radius, index, cache) {
            if (!cache) {
                cache = _hex_cache(radius);
            }

            var shape = cache.hexes[index];
            if (!shape) {
                cache.hexes[index] = shape = window.EASEL_MAP.util.draw_hex.draw(0, 0, radius, 'white');
            }

            var position = window.EASEL_MAP.util.draw_hex.placement(row, column, radius, true);

            shape.x = position.center_x;
            shape.y = position.center_y;

            return {
                shape: shape, cache: cache
            }
        }

        var heightmap = new EASEL_MAP.util.Perlin_Canvas([0.25, 0.5, 1, 4, 8, 16, 32, 64, 128], 400, 300);
        heightmap.alpha_pow = 2.5;
        var map_width = map.right - map.left;
        var map_height = map.bottom - map.top;
        var heightmap_width = map_width / MAP_GREY_RATIO;
        var heightmap_height = map_height / MAP_GREY_RATIO;


        console.log('doing map', heightmap_width, heightmap_height);
        heightmap.render(heightmap_width, heightmap_height);
        console.log('perlin rendered');

        var INC = 10;
        shape_layer.add_tile_shapes = function (tile) {
            console.log('drawing tile ', tile.i, 'x', tile.j, 'at', tile.layer.scale());
            var cell_radius = hex_size / this.scale();

            var t = new Date().getTime();

            var divs = 12;

            var hexagons = new createjs.Shape();
            var back_fill = new createjs.Shape();

            if ((tile.i + tile.j) % 2) {
                back_fill.graphics.f('rgb(204, 204, 255)');
            } else {
                back_fill.graphics.f('rgb(204, 255, 255)');
            }
            back_fill.graphics.r(tile.left(), tile.top(), this.tile_width / this.scale(), this.tile_height / this.scale());
            tile.container().addChild(back_fill);
            var scale = this.scale();
            tile.container().addChild(hexagons);
            var hex_range = EASEL_MAP.util.draw_hex.hex_extent(tile.left(), tile.right(), tile.top(), tile.bottom(), cell_radius);

            var index = 0;
            _.each(_.range(hex_range.left - 1, hex_range.right + 1), function (col) {
                _.each(_.range(hex_range.top - 1, hex_range.bottom + 1), function (row) {

                    //  var color = color_choices[(col + row) % color_choices.length];

                    var center = EASEL_MAP.util.draw_hex.placement(row, col, cell_radius, true);
                    //  console.log('hex center: ', JSON.stringify(center));
                    var grey = heightmap.color(center.center_x / MAP_GREY_RATIO, center.center_y / MAP_GREY_RATIO);
                    if (cell_radius * scale > 10) {
                        EASEL_MAP.util.draw_hex.draw(row, col, cell_radius, grey_from_255(grey), hexagons);
                    } else {
                        hexagons.graphics.f(grey_from_255(grey)).dc(center.center_x, center.center_y, cell_radius * 0.975).ef();
                    }
                    ++index;
                });
            });


            var boundry_rect = new createjs.Shape();
            boundry_rect.graphics.s('red').ss(2).dr(tile.left(), tile.top(), tile.width(), tile.height());
            tile.container().addChild(boundry_rect);

            var text = new createjs.Text(tile.i + 'x' + tile.j, (20 / this.scale()) + 'pt Arial', 'red');
            text.x = tile.left() + 10 / this.scale();
            text.y = tile.top() + 10 / this.scale();
            tile.container().addChild(text);
        };

        var canvas = $('canvas')[0];
        var stage = map.render(render_params, null, canvas);

        var D = 100;

        function stat() {
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
            stat();
        });

        $('#zoom_out').click(function () {
            if (render_params.scale >= 0.125) {
                render_params.scale /= 2;
                map.render(render_params, stage);
            }
            stat();
        });

        $('#hex_size').change(function (e) {
            hex_size = parseInt($(e.target).val());
            console.log('hex size', e, hex_size);
            map.refresh();
            map.render(render_params, stage);
        });

    })
})(window);