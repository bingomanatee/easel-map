(function (window) {

    function _grid_extent(unit, scale,
                          width, height,
                          left, top) {
        var scaled_width = width / scale;
        var scaled_height = height / scale;

        var leftmost_index = Math.floor(left / unit);
        var topmost_index = Math.floor(top / unit);
        var index_width = scaled_width / unit;
        var index_height = scaled_height / unit;

        return {
            left_i: leftmost_index,
            right_i: Math.ceil(leftmost_index + index_width) + 1,
            top_j: topmost_index,
            bottom_j: Math.ceil(topmost_index + index_height) + 1
        }

    }

    if (typeof(module) == 'undefined') {
        EASEL_MAP.util.grid_extent = _grid_extent;
    } else {
        module.exports = _grid_extent;
    }

})(window);