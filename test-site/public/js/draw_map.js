(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});
        var render_params = {scale: 0.5, left: -200, top: -100, heavy_freq: 6};

        var hex_layer = EASEL_MAP.hex_layer('back_hexes', map, {
            grid_params: {
                hex_size: 100, labels: true, label_increment: 2
            }
        });

        hex_layer.pre_render = function (stage, render_params) {
            console.log('pre_rendering');
            var buttons = new createjs.Container();
            buttons.name = 'buttons';
            this.container.addChild(buttons);
            this.button_layer = buttons;
        };

        hex_layer.post_render = function (stage, render_params) {
            _.each(this.hexes, function (hex) {
                var button_shape = new createjs.Shape();
                hex.is_yellow = true;

                function _draw_button(){
                    button_shape.graphics.c().f(hex.is_yellow ? 'yellow' : 'white');
                    var l = _.last(hex.points);
                    button_shape.graphics.mt(l.x(),l.y());
                    _.each(hex.points, function(p){
                        button_shape.graphics.lt(p.x(), p.y());
                    });
                    button_shape.cache(0,
                        0, stage.canvas.width,
                        stage.canvas.height)
                }

                _draw_button();

                button_shape.addEventListener('click', function(){
                    hex.is_yellow = !hex.is_yellow;
                    _draw_button();
                    stage.update();
                });


                this.button_layer.addChild(button_shape);
                stage.update();
            }, this);
        };

        map.render(render_params, $('canvas')[0]);
    })
})(window);