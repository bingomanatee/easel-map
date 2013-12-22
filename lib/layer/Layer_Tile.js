(function (window) {

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
    window.EASEL_MAP.Layer_Tile = function (layer, i, j) {
        this.layer = layer;

        if (!this.layer.caches) this.layer.caches = [];

        this.i = i;
        this.j = j;
        this.loaded = false;
    }

    window.EASEL_MAP.Layer_Tile.prototype = {

        /**
         * This is the main "draw" routine of the tile.
         * It presumes the tiles have been created.
         * it calls the local add_tile_shapes to load custom content
         * then caches itself.
         *
         * @param scale
         */
        load: function (scale) {
            this.container().removeAllChildren();
            if (!scale) scale = this.scale();

            this.layer.add_tile_shapes(this);
            this.cache(scale);
            this.loaded_scale = scale;

            this.loaded = true;
        },

        refresh: function(){
            this.container().uncache();
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

            if ((this.container().cacheLayer) && this.loaded_scale == scale){
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

    }


})(window);