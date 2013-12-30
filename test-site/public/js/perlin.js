(function(window){


    window.make_heightmap = function make_heightmap(map, MAP_GREY_RATIO) {
        var heightmap = new EASEL_MAP.util.Perlin_Canvas([0.25, 1, 2, 4, 16, 32, 64], 600, 400); //[0.25, 0.5, 1, 4, 8, 16, 32, 64, 128]
        heightmap.alpha_pow = 2.5;
        var map_width = map.right - map.left;
        var map_height = map.bottom - map.top;
        var heightmap_width = map_width / MAP_GREY_RATIO;
        var heightmap_height = map_height / MAP_GREY_RATIO;

        heightmap.render(heightmap_width, heightmap_height);
        return heightmap;

    }

})(window);