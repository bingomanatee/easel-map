(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.25, left: 5, top: 0, heavy_freq: 6, tile_width: 100, tile_height: 100};
        var MAP_GREY_RATIO = 10;
        var shape_layer = map.add_layer('shapes');

        var rect = new createjs.Shape();
        rect.x = 150;
        rect.y = 250;
        rect.width = 300;
        rect.height = 200;

        rect.range = {
            left: rect.x,
            top: rect.y,
            right: rect.x + rect.width,
            bottom: rect.y + rect.height};

        var disc = new createjs.Shape();
        disc.x = 200;
        disc.y = 200;
        disc.radius = 75;
        disc.range = {
            left: disc.x - disc.radius,
            top: disc.y - disc.radius,
            right: disc.x + disc.radius,
            bottom: disc.y + disc.radius};

        disc.graphics.f('blue').dc(0, 0, disc.radius);

        rect.graphics.f('red').r(0, 0, rect.width, rect.height);

        var heightmap = new EASEL_MAP.util.Perlin_Canvas( [0.25, 0.5, 1, 4, 8, 16, 32, 64, 128], 400, 300);
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
         //   console.log('drawing tile ', tile.i, 'x', tile.j, 'at', tile.layer.scale());
            var cell_radius = 100 *  tile.layer.scale();

            var t = new Date().getTime();

            var divs = 12;

            var hexagons = new createjs.Shape();
            var back_fill = new createjs.Shape();

            if ((tile.i + tile.j) % 2) {
                back_fill.graphics.f('rgb(204, 204, 255)');
            } else {
                back_fill.graphics.f('rgb(204, 255, 255)');
            }
            back_fill.graphics.r(tile.left(), tile.top(), this.tile_width, this.tile_height);
            tile.container().addChild(back_fill);
            tile.container().addChild(hexagons);
            var hex_range = EASEL_MAP.util.draw_hex.hex_extent(tile.left(), tile.right(),tile.top(), tile.bottom(), cell_radius);

            _.each(_.range(hex_range.left, hex_range.right), function (col) {
                _.each(_.range(hex_range.top, hex_range.bottom), function (row) {
                    var center = EASEL_MAP.util.draw_hex.placement(row, col, cell_radius, true);
                    var grey = heightmap.color(center.center_x / MAP_GREY_RATIO, center.center_y / MAP_GREY_RATIO);
                    EASEL_MAP.util.draw_hex.draw(row, col, cell_radius, grey);
                });
            });

            var boundry_rect = new createjs.Shape();
            boundry_rect.graphics.s('red').ss(2).dr(tile.left(), tile.top(), tile.width(), tile.height());
            tile.container().addChild(boundry_rect);

            var text = new createjs.Text(tile.i + 'x' + tile.j, (20 / this.scale()) + 'pt Arial', 'red');
            text.x = tile.left() + 10 / this.scale();
            text.y = tile.top() + 10/this.scale();
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
            console.log('hex size', e, $(e.target).val());

        });

    })
})(window);
