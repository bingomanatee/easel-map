(function (window) {
    var _land_color = _.template('hsl(0, 20%, <%= grey  %>%)');
    var _sea_color = _.template('hsl(180, 50%, <%= grey  %>%)');

    var SEA_LEVEL = 120;
    var MIN_LAND_GREY = 0.2;
    var MAX_SEA_BLUE = 0.7;

    function _p(v) {
        v = Math.round(100 * v);
        v -= v % 2;
        return v;
    }

    window.terrain_color = function terrain_color(grey) {
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
})(window);