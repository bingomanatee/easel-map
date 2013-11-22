(function (window) {

    EASEL_MAP.Layer = function (name, map, params) {
        if (!_.isString(name)) {
            throw new Error('name must be string');
        }
        this.name = name;
        this.map = map;
        _.extend(this, params);
        this.order = map.layers.length;
        this.name = name;
        this.events = {};
        this.tiles = [];
    };

    EASEL_MAP.Layer.prototype = {

        pre_render: function (stage, params) {
            this.set_stage(stage);
            if (params.hasOwnProperty('left')) {
                this.offset_layer().x = params.left;
            }
            if (params.hasOwnProperty('top')) {
                this.offset_layer().y = params.top;
            }
            if (params.hasOwnProperty('scale')){
                var gc = this.scale_layer();
                gc.scaleX = gc.scaleY = this.scale(params.scale);
            }
        },
        render: function (stage, params) {
            this.set_stage(stage);
            var tiles = this.retile();

            _.each(tiles, function (tile) {
                if (!tile.loaded) {
                    tile.load();
                }
            }, this);
        },

        cache: function (stage) {
            if (this.container.x || this.container.y || this.container.scaleX != 1 || this.container.scaleY != 1) {
                throw new Error('cannot cache offset/scaled containers');
            }
            this.container.cache(0, 0, stage.canvas.width, stage.canvas.height);
        },

        tile_width: function () {
            return 200;
        },

        tile_height: function () {
            return 200;
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

        scale: function (s) {
            if (arguments.length > 0) {
                this._scale = s;
            }
            return this._scale;
        },

        render_sublayers: function (render_params) {
            this.scale(render_params.scale || 1);
            var gc = this.scale_layer();
            gc.scaleX = gc.scaleY = this.scale();
            var gct = this.grid_container_t;
            gct.x = render_params.left;
            gct.y = render_params.top;
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
                console.log('handling event ', name);
                return this.events[name](e);
            } else {
                console.log('no handler for event ', name);
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

            ltl.x = Math.max(this.map.left, ltl.x);
            ltl.y = Math.max(this.map.top, ltl.y);

            tl.move_around(ltl.x, ltl.y);

            var br = this.tile(tl.i, tl.j);
            var lbr = this.local_br();

            lbr.x = Math.min(this.map.right,lbr.x);
            lbr.y = Math.min(this.map.bottom, lbr.y);

            br.move_around(lbr.x, lbr.y);



            return {tl: tl, br: br};
        },

        tile: function (x, y) {
            return new EASEL_MAP.Layer_Tile(this, x, y);
        },

        add_tile_shapes: function (tile) {

        },

        retile: function () {
            // return;
            var tr = this.tile_range();

            var left = tr.tl.i;
            var right = tr.br.i;
            var top = tr.tl.j;
            var bottom = tr.br.j;

            var old_tiles = this.tiles.filter(function (tile) {
                return tile.i >= left &&
                    tile.i <= right &&
                    tile.j >= top &&
                    tile.j <= bottom;
            });

            var self = this;
            _.each(_.range(left, right + 1), function (i) {
                _.each(_.range(top, bottom + 1), function (j) {
                    var old_tile = _.find(old_tiles, function (tile) {
                        return tile.i == i && tile.j == j;
                    });
                    if (!old_tile) {
                        old_tiles.push(this.tile(i, j));
                    }
                }, this);
            }, this)
            return old_tiles;
        }

    };
})(window);