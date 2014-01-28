(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.25, left: 5, top: 0, heavy_freq: 6, tile_width: 100, tile_height: 100, hex_size: 10};
        var MAP_GREY_RATIO = 15;
        var heightmap = window.make_heightmap(map, MAP_GREY_RATIO);

        // for testing - visualizing greymap
        $('.heightmap-show').append(heightmap.canvas);

        var perlin_stage = new createjs.Stage(heightmap.canvas);
        perlin_stage.autoClear = false;

        $('#wrap').click(function(){

            var temp_cache = document.createElement('canvas');
            temp_cache.width = perlin_stage.canvas.width;
            temp_cache.height = perlin_stage.canvas.height;

            var b1 = new createjs.Bitmap(perlin_stage.canvas);
            b1.x = perlin_stage.canvas.width/2;

            var b2 = new createjs.Bitmap(perlin_stage.canvas);
            b2.x = -perlin_stage.canvas.width/2;

            var temp_stage = new createjs.Stage(temp_cache);
            temp_stage.addChild(b1);
            temp_stage.addChild(b2);

            temp_stage.update();

            var b3 = new createjs.Bitmap(temp_stage.canvas);

            perlin_stage.removeAllChildren();
            perlin_stage.addChild(b3);
            perlin_stage.update();

            perlin_stage.removeAllChildren();
            map.refresh();
            map.render(render_params, stage);
        });

        var hex_cache = { };

        function _localize(event, offset) {
            var shape_layer_coords = shape_layer.offset_layer().globalToLocal(event.stageX, event.stageY);

            shape_layer_coords.x /= MAP_GREY_RATIO;
            shape_layer_coords.y /= MAP_GREY_RATIO;

            return shape_layer_coords;
        }

        _.each(_.range(0, 10), function (ci) {
            var color = window.terrain_color(255 * ci / 9);
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
                back_fill.graphics.f('grey').r(tile.left(), tile.top(), this.tile_width / this.scale(), this.tile_height / this.scale());
                tile.container().addChild(back_fill);
                //    tile.container().addChild(hexagons);
                var hex_range = EASEL_MAP.util.draw_hex.hex_extent(tile.left(), tile.right(), tile.top(), tile.bottom(), cell_radius);
                _.each(_.range(hex_range.left - 1, hex_range.right + 1), function (col) {
                    _.each(_.range(hex_range.top - 1, hex_range.bottom + 1), function (row) {
                        var center = EASEL_MAP.util.draw_hex.placement(row, col, cell_radius);
                        var shade = heightmap.color((center.center_x + map.width() / 2) / MAP_GREY_RATIO, (center.center_y + map.height() / 2) / MAP_GREY_RATIO);
                        var cached_hex = _get_cached_hex(window.terrain_color(shade), cell_radius);

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
                    /**
                     * This method paints onto the greyscale canvas originally rendered by the perlin utility.
                     * This has the effect of raising or lowering terrain on the map.
                     * Note, this is far from real time - you don't see the effect of painting til you let go of the mouse.
                     */
                    var shape = new createjs.Shape();
                    var shape_layer_coords = _localize(event);
                    shape_layer_coords.x += perlin_stage.canvas.width / 2;
                    shape_layer_coords.y += perlin_stage.canvas.height / 2;
                    var grey = Math.round($('#height-range').val());
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

        var grid_layer = map.add_layer('grid', {

            add_tile_shapes: function (tile) {
                var container = tile.container();

                var h_shape = new createjs.Shape();
                container.addChild(h_shape);
                h_shape.graphics.ss(2 / render_params.scale).s('blue');

                _.each(_.range(map.top, map.bottom + 2, map.height() / 12), function (latitude) {
                    if (latitude >= tile.top() && latitude <= tile.bottom()){
                        h_shape.graphics.mt(map.left, latitude);
                        h_shape.graphics.lt(map.right, latitude);
                    }
                });

                var v_shape = new createjs.Shape();
                container.addChild(v_shape);
                h_shape.graphics.ss( 1/ render_params.scale).s('blue');

                _.each(_.range(map.left, map.right + 2, map.width() / 20), function (longitude) {
                    if (longitude >= tile.left() && longitude <= tile.right()){
                        h_shape.graphics.mt(longitude, map.top);
                        h_shape.graphics.lt(longitude, map.bottom);
                    }
                });

                var equator = new createjs.Shape();
                equator.graphics.ss(2/render_params.scale).s('red');
                equator.graphics.mt(map.left, map.top + map.height()/2).lt(map.right, map.top + map.height()/2);

                container.addChild(equator);
                // todo: optimize for tile size
            }

        });

        /**
         * initial render; creation of stage.
         */

        var canvas = $('canvas')[0];
        var stage = map.render(render_params, null, canvas);

        window.map_ui(map, render_params, stage);

    })
})(window);
