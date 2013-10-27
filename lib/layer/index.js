(function (window) {

    EASEL_MAP.Layer = function (name, map, params) {
        this.name = name;
        this.map = map;
        _.extend(this, params);
        this.order = map.layers.length;
    };

    EASEL_MAP.Layer.prototype = {

        init_as_grid: function () {
            if (this.grid_size){
                this.grid_i = this.grid_j = this.grid_size;
            } else {
                if (!this.grid_i && this.grid_j){
                    throw new Error('need a grid-i and grid-j for grid');
                }
            }
        }
    };
})(window);