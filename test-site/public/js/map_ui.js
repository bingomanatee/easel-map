(function (window) {

    /**
     * this file covers the navigation, zoom and pan buttons.
     * note that the paint commands require no direct scripting; their
     * values are polled at draw time.
     *
     * @param map {EASEL_MAP.Map}
     * @param render_params {Object} has the top, left, scale parameter needed to orient map.
     * Also has the hex_scale parameter native to the terrain layer.
     *
     * @param stage {createjs.Stage}
     */

    window.map_ui = function (map, render_params, stage) {

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
            render_params.hex_size = parseInt($(e.target).val());
            console.log('hex size', e, hex_size);
            map.refresh();
            map.render(render_params, stage);
        });
    }

})(window);