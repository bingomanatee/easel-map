(function () {
    $(function () {
        var map = new EASEL_MAP.Map();
        // EASEL_MAP.grid_layer('back grid', map, {grid_params:{line_color: 'rgba(0, 204,0,0.5)'}});

        EASEL_MAP.hex_layer('back_hexes', map, {
            grid_params: {
                hex_size: 50, label_increment: 8
            }
        });

        map.render({scale: 0.5, left: 0, top: 0}, $('canvas')[0]);
    })
})(window);