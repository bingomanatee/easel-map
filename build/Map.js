
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('underscore'), require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['_', 'require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.Map = factory(root._, req, exp, mod);
    }
}(this, function(_, require, exports, module) {
var _defaults = {
    top: -3250,
    bottom: 3250,
    left: -6500,
    right: 6500
};

function Map(params) {
    this.init();
    _.defaults(this, _defaults);
    _.extend(this, params);

};

Map.prototype = {

    height: function () {
        return this.bottom - this.top;
    },

    width: function () {
        return this.right - this.left;
    },

    init: function () {
        this.paths = [];
        this.regions = [];
        this.spots = [];
        this.units = 'm';
        this.layers = {};
    },

    render: function (params, stage, canvas) {

        if (!stage) {
            if (!canvas) throw new Error("must provide stage or canvas to render");
            stage = new createjs.Stage(canvas);
        }

        var layers = this.get_layers();

        _.each(layers, function (layer) {
            layer.set_coordinates(stage, params);
        }, this);

        _.each(layers, function (layer) {
            if (layer.pre_render) {
                layer.pre_render(stage, params);
            } else {
            }
        }, this);

        _.each(layers, function (layer) {
            layer.render(stage, params);
        });

        _.each(layers, function (layer) {
            if (layer.post_render) {
                layer.post_render(stage, params);
            }

            if (!layer.events_updated) {
                layer.update_events();
                layer.events_updated = true;
            }
        }, this);
        stage.update();
        return stage;
    },

    render_layer: function (layer, params, stage) {

        if (_.isString(layer)) {
            layer = this.layers[layer];
        }

        if (!layer) {
            throw new Error('cannot get layer ' + layer);
        }

        if (params) {
            layer.set_coordinates(stage, params);
        }

        if (layer.pre_render) {
            console.log('rendering prerender for ', layer.name);
            layer.pre_render(stage, params);
        } else {
            console.log('no prerender for ', layer.name);
        }

        layer.render(stage, params);

        if (!layer.events_updated) {
            layer.update_events();
            layer.events_updated = true;
        }

        stage.update();
        return stage;
    },

    refresh: function (layer_names) {

        _.each(this.layers, function (layer) {
            if (!layer_names || _.contains(layer_names, layer.name)) {
                layer.refresh();
            }
        })
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
            layer = this.layers[layer] = new Layer(layer, this, params || {});
        } else if (this.layers[layer.name]) {
            throw new Error('already have a layer ', layer.name);
        } else {
            this.layers[layer.name] = layer;
        }

        return layer;

    },

    set_coordinates: function (params, stage) {
        _.each(this.get_layers(), function (layer) {
            layer.set_coordinates(stage, params);
        }, this);
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
    return Map;
}));
