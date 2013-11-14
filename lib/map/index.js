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
            this.units = 'm';
            this.layers = {};
        },

        get_layers: function(reverse){
          var out = _.sortBy(_.values(this.layers), 'order');
            if (reverse){
                return out.reverse();
            } else {
                return out;
            }
        },

        add_layer: function(layer){
            if (this.layers[layer.name]){
                throw new Error('already have a layer ' + name);
            }
            this.layers[layer.name] = layer;
        },

        event: function(name, e){
            var bubbles = this.get_layers(true);

            var handled = false;

            _.each(bubbles, function(layer){
               if(!handled){
                   handled = layer.event(name, e);
               }
            })
        }

    };

})(window);