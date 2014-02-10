
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('canvas'), require('./Stats'), require('node-easel'), require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['_', 'Canvas', 'Stats', 'createjs', 'require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.EASEL_MAP = factory(root._, root.Canvas, root.Stats, root.createjs, req, exp, mod);
    }
}(this, function(_, Canvas, Stats, createjs, require, exports, module) {
var EASEL_MAP = {
    util: {
        color: function (r, g, b) {
            if (arguments.length < 3) {
                g = b = r;
            }

            return _.template('rgb(<%= red %>, <%= green %>, <%= blue %>)', {
                    red: r,
                    green: g,
                    blue: b}
            );
        },
        average: function(){
          var args = _.toArray(arguments);
            var s = new Stats();
            s.push(args);
            return s.amean();
        }
    },
    _proto: {
    },
    class: {
    }
};

EASEL_MAP.util.init_canvas =  function init_canvas(width, height){
    if (typeof document != 'undefined'){
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
    } else {
        canvas = new Canvas(width, height);
    }

    return canvas;
}
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

EASEL_MAP.Map = Map;
var DEBUG_TILES = false;
var DEFAULT_TILE_SIZE = 200;

Layer = function Layer(name, map, params) {
    if (!_.isString(name)) {
        throw new Error('name must be string');
    }
    this.name = name;
    this.map = map;
    this.tile_width = this.tile_height = DEFAULT_TILE_SIZE;
    this.events = {};
    this.tiles = [];
    _.extend(this, params);
    this.order = map.layers.length;
    this.name = name;
};

Layer.prototype = {

    set_coordinates: function (stage, params) {
        if (stage) {
            this.set_stage(stage);
        }
        if (params.hasOwnProperty('left')) {
            this.offset_layer().x = this.left(params.left);
        }
        if (params.hasOwnProperty('top')) {
            this.offset_layer().y = this.top(params.top);
        }
        if (params.hasOwnProperty('scale')) {
            var gc = this.scale_layer();
            gc.scaleX = gc.scaleY = this.scale(params.scale);
        }
    },
    render: function (stage) {
        this.set_stage(stage);
        var tiles = this.retile();

        _.each(tiles, function (tile) {
            //  console.log('scale for ', tile.i, tile.j, 'is', tile.loaded_scale, 'against', this.scale());
            if (tile.loaded_scale != this.scale()) {
                tile.load();
            } else {
                //     console.log('not redrawing ', tile.i, tile.j);
            }
        }, this);
    },

    cache: function (stage) {
        //  console.log('caching layer', this);
        if (this.container.x || this.container.y || this.container.scaleX != 1 || this.container.scaleY != 1) {
            throw new Error('cannot cache offset/scaled containers');
        }
        this.container.cache(0, 0, stage.canvas.width, stage.canvas.height);
    },

    scale_layer: function () {
        if (!this._scale_layer) {
            this._scale_layer = new createjs.Container();
            this.stage_layer().addChild(this._scale_layer);
        }
        return this._scale_layer;
    },

    offset_layer: function () {
        if (!this._offset_layer) {
            this._offset_layer = new createjs.Container();
            this.scale_layer().addChild(this._offset_layer);

        }
        return this._offset_layer;
    },

    update_events: function () {
        _.each(this.events, function (handler, name) {
            this.offset_layer().removeAllEventListeners(name);
            this.offset_layer().on(name, handler);
        }, this);
    },

    scale: function (s) {
        if (arguments.length > 0) {
            this._scale = s;
        }
        return this._scale;
    },

    left: function (s) {
        if (arguments.length > 0) {
            this._left = s;
        }
        return this._left;
    },

    top: function (s) {
        if (arguments.length > 0) {
            this._top = s;
        }
        return this._top;
    },

    set_stage: function (stage) {
        this.stage = stage;
    },

    stage_layer: function () {
        if (!this.container) {
            var stage_container = this.stage.getChildByName(this.name);
            if (!stage_container) {
                stage_container = new createjs.Container();
                stage_container.name = this.name;
                this.stage.addChild(stage_container);
            }
            this.container = stage_container;
        }
        return this.container;
    },

    event: function (name, e) {
        if (this.events[name]) {
            return this.events[name](e);
        } else {
            return false;
        }
    },

    local_tl: function () {
        return this.offset_layer().globalToLocal(0, 0);
    },

    local_br: function () {
        return this.offset_layer().globalToLocal(this.stage.canvas.width, this.stage.canvas.height);
    },

    tile_range: function () {
        var tl = this.tile(0, 0);
        var ltl = this.local_tl();

        //   ltl.x = Math.max(this.map.left, ltl.x);
        //    ltl.y = Math.max(this.map.top, ltl.y);

        tl.move_around(ltl.x, ltl.y);

        var br = this.tile(tl.i, tl.j);
        var lbr = this.local_br();

        //  lbr.x = Math.min(this.map.right,lbr.x);
        //   lbr.y = Math.min(this.map.bottom, lbr.y);

        br.move_around(lbr.x, lbr.y);

        return {tl: _.pick(tl, 'i', 'j'), br: _.pick(br, 'i', 'j')};
    },

    tile: function (x, y) {
        return new EASEL_MAP.Tile(this, x, y);
    },

    add_tile_shapes: function (tile) {
        throw new Error('must be overridden by layer definition')
    },

    refresh: function () {
        _.each(this.tiles, function (tile) {
            tile.refresh();
            tile.load();
        }, this);
    },

    retile: function () {
        // return;
        var tr = this.tile_range();
        //    console.log('tile range:', JSON.stringify(tr));

        var left = tr.tl.i;
        var right = tr.br.i;
        var top = tr.tl.j;
        var bottom = tr.br.j;

        function _in_range(tile) {
            return tile.i >= left &&
                tile.i <= right &&
                tile.j >= top &&
                tile.j <= bottom;
        }

        console.log('looking for old tiles in', this.tiles.length, 'old tiles');

        var old_tiles = this.tiles.filter(_in_range);
        var removed_tiles = _.reject(this.tiles, _in_range);

        _.each(removed_tiles, function (tile) {
            tile.container().removeAllChildren();
            if (tile.container().parent) {
                tile.container().parent.removeChild(tile.container());
            }
        }, this);

        _.each(_.range(left, right + 1), function (i) {
            _.each(_.range(top, bottom + 1), function (j) {
                var old_tile = _.find(old_tiles, function (tile) {
                    return tile.i == i && tile.j == j;
                });
                if (!old_tile) {
                    var tile = this.tile(i, j);

                    this.tiles.push(tile);
                    old_tiles.push(tile);
                }
            }, this);
        }, this);

        // forgetting tiles that are out of the screen

        this.tiles = old_tiles;
        return this.tiles;
    },

    bounds: function () {

        var top_left = this.offset_layer().globalToLocal(0, 0);

        var bottom_right = this.offset_layer().globalToLocal(this.stage.canvas.width, this.stage.canvas.height);

        var out = {
            top: top_left.y,
            left: top_left.x,
            bottom: bottom_right.y,
            right: bottom_right.x
        };

        out.width = out.right - out.left;
        out.height = out.bottom - out.top;
        return out;
    }

};

EASEL_MAP.Layer = Layer;
/**
 * The layer tile is a region of the map.
 * The map is broken into smaller regions to increase the utility of caching,
 * reduce the overhead of mouse click tracking, and because Google does it.
 *
 * No matter what the map scale is tiles always take up the same amount of
 * visual space. that is, if you zoom in, a given tile will have four times
 * as much stuff on it.
 *
 * @param layer {EASEL_MAP.Layer}
 * @param i {int} the column/x index
 * @param j {int} the row/y index
 *
 * @constructor
 */
function Tile(layer, i, j) {
    this.layer = layer;

    this.i = i;
    this.j = j;
    this.loaded = false;
}

Tile.prototype = {

    /**
     * This is the main "draw" routine of the tile.
     * It presumes the tiles have been created.
     * it calls the local add_tile_shapes to load custom content
     *
     */
    load: function () {
        this.container().removeAllChildren();
        var scale = this.layer.scale();

        this.layer.add_tile_shapes(this);
        this.cache(scale);
        this.loaded_scale = scale;

        this.loaded = true;
    },

    refresh: function () {
        this.container().uncache();
        this.container().removeAllChildren();
    },

    move_around: function (x, y) {
        var xd, yd;
        while (xd = this._x_d(x)) {
            this.i += xd;
        }
        while (yd = this._y_d(y)) {
            this.j += yd;
        }
    },

    _x_d: function (x) {
        var left = this.left();
        var right = this.right();

        if (x < left) {
            return -1;
        } else if (x > right) {
            return 1;
        } else {
            return 0;
        }
    },

    _y_d: function (y) {
        var top = this.top();
        var bottom = this.bottom();
        if (y < top) {
            return -1;
        } else if (y > bottom) {
            return 1;
        } else {
            return 0;
        }
    },

    cache: function (scale) {
        var left = Math.floor(this.left() - 1);
        var top = Math.floor(this.top() - 1);
        var width = Math.ceil(this.layer.tile_width / scale + 2);

        // console.log('caching', left, top, width, 'at scale', scale);

        if ((this.container().cacheLayer) && this.loaded_scale == scale) {
            this.container().updateCache();
        } else {
            this.container().cache(
                left,
                top,
                width,
                width,
                scale
            );
        }
    },

    left: function () {
        return this.i * this.width();
    },

    top: function () {
        return this.j * this.height();
    },

    right: function () {
        return this.left() + this.width();
    },

    bottom: function () {
        return this.top() + this.height();
    },

    width: function () {
        return this.layer.tile_width / this.layer.scale();
    },

    height: function () {
        return this.layer.tile_height / this.layer.scale();
    },

    container: function () {
        if (!this._container) {
            this._container = new createjs.Container();
            this.layer.offset_layer().addChild(this._container);
        }
        return this._container;
    },

    contains: function (range) {
        if (this.left() >= range.right) {
            console.log('left', this.left(), '>= range.right', range.right);
            return false;
        }
        if (this.right() <= range.left) {
            console.log('right', this.right(), '<= range.left', range.left);
            return false;
        }
        if (this.top() >= range.bottom) {
            console.log('top', this.top(), '>= range.bottom', range.bottom);
            return false;
        }
        if (this.bottom() <= range.top) {
            console.log('bottom', this.bottom(), '<= range.top', range.top);
            return false;
        }
        return true;
    }

};

EASEL_MAP.Tile = Tile;
    return EASEL_MAP;
}));
