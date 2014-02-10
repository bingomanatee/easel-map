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