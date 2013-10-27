(function (w) {

    EASEL_MAP.Map = function (params) {
       this.init();
        _.extend(this, params);

    };

    EASEL_MAP.Map.prototype = {
        init: function () {
            this.paths = [];
            this.regions = [];
            this.spots = [];
            this.units = 'km';
            this.layers = {};
        },

        add_layer: function(name, params){
            if (this.layers[name]){
                throw new Error('already have a layer ' + name);
            }
            this.layers[name] = new EASEL_MAP.Layer(name, this, params);
        }
    };


})(window);