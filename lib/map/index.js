(function (w) {

    var _defaults = {
        top: -3250,
        bottom: 3250,
        left: -6500,
        right: 6500
    };

    window.EASEL_MAP.Map = function (params) {
        this.init();
        _.defaults(this, _defaults);
        _.extend(this, params);

    };

    window.EASEL_MAP.Map.prototype = {
        init: function () {
            this.paths = [];
            this.regions = [];
            this.spots = [];
            this.units = 'm';
            this.layers = {};
        },

        get_layers: function (reverse) {
            var out = _.sortBy(_.values(this.layers), 'order');
            if (reverse) {
                return out.reverse();
            } else {
                return out;
            }
        },

        add_layer: function (layer, params) {
            if (_.isString(layer)) {
                if (this.layers[layer]) {
                    throw new Error('already have a layer ' + layer);
                }
                layer = this.layers[layer] = new EASEL_MAP.Layer(layer, this, params || {});
            } else if (this.layers[layer.name]) {
                throw new Error('already have a layer ', layer.name);
            } else {
                this.layers[layer.name] = layer;
            }

            return layer;

        },

        event: function (name, e) {
            var bubbles = this.get_layers(true);

            var handled = false;

            _.each(bubbles, function (layer) {
                if (!handled) {
                    handled = layer.event(name, e);
                }
            })
        }

    };

})(window);