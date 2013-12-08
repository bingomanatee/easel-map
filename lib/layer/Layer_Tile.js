(function (window) {

    EASEL_MAP.Layer_Tile = function (layer, i, j) {
        this.layer = layer;

        if (!this.layer.caches) this.layer.caches = [];

        this.i = i;
        this.j = j;

        this.layer.tiles.push(this);
        this.loaded = false;
    }

    EASEL_MAP.Layer_Tile.prototype = {

        load: function (scale) {
            this.container().removeAllChildren();

            var old_cache = _.find(this.layer.caches, function (cache_item) {
                return cache_item.tile.i == this.i && cache_item.tile.j == this.j && cache_item.scale == scale;;
            }, this);

            if (old_cache) {
                this.cache(1/scale, true);
                this.container().cacheCanvas = old_cache.cacheCanvas;
                console.log('restoring cache for tile ', this.i, this.j, scale);
            } else {
                console.log('drawing for the first time tile ', this.i, this.j, 'at scale', scale);
                this.layer.add_tile_shapes(this);
                this.loaded_scale = scale;
                this.cache();
            }
            this.loaded = true;
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

        cache: function (scale, noSave) {
            this.container().cache(
                Math.floor(this.left() - 1),
                Math.floor(this.top() - 1),
                Math.ceil(this.width() + 2),
                Math.ceil(this.height() + 2),
                scale
            );
            if (!noSave) {
                this.layer.caches.push({scale: scale, tile: this, cacheCanvas: this.container().cacheCanvas});
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
            return this.layer.tile_width();
        },

        height: function () {
            return this.layer.tile_height();
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

    }


})(window);