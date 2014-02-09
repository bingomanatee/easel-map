(function (window) {

    // generates perlin based on overlapping scaled bitmaps

    window.EASEL_MAP.util.Perlin_Canvas = function (scale, bw, bh) {

        this.bitmap_width = bw || 200;
        this.bitmap_height = bh || 100;
        this.alpha_pow = 2;
        this.scales = scale;

        this.offsets = _.map(this.scales, function () {
            return [Math.random() * this.bitmap_width, Math.random() * this.bitmap_height];
        }, this);
    };


    window.EASEL_MAP.util.Perlin_Canvas.prototype = {

        render: function (width, height) {

            this.bitmaps = _.map(this.scales, this.render_bitmap(this.bitmap_width, this.bitmap_height), this);

            this.canvas = document.createElement('canvas');
            this.canvas.width = width;
            this.canvas.height = height;

            var r = new createjs.Shape();
            r.graphics.f('rgb(128,128,128)').dr(0,0,width, height);

            var stage = new createjs.Stage(this.canvas);
            stage.addChild(r);

            _.each(this.scales, function (scale, i) {

                var a_canvas = document.createElement('canvas');
                var a_stage = new createjs.Stage(a_canvas);
/*                a_stage.addChild(_circles_on_shape(2, width, height));
                a_stage.update(); */

                var shape = new createjs.Shape();
                shape.alpha = 1/this.alpha_pow;
                stage.addChild(shape);

                var offset = this.offsets[i];
                var matrix = new createjs.Matrix2D(scale, 0, 0, scale, 0,0, offset[0], offset[1]);
                var bitmap = this.bitmaps[i];
                console.log('bitmap: ', bitmap);
                shape.graphics.bf(bitmap, 'repeat', matrix).dr(0, 0, width, height);
            }, this);

            this._data_cache = false;
            stage.update();

        },

        cache_data: function(){
            this._data_cache = [];

            var ctx = this.canvas.getContext('2d');
            var id = ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
            _.each(id.data, function(v, index){
                switch(index % 4){
                    case 0:
                        this._data_cache.push(v);
                        break;

                    default:
                }
            }, this);
        },

        color: function(x, y){
            if (x < 0 || y < 0 || x >= this.canvas.width || y >= this.canvas.height){
                return 0;
            }
            if ((x % 1) || (y % 1)){
                var x_fract = x % 1;
                var y_fract = y % 1;
                var left_x = x_fract;
                var right_x = 1 - x_fract;
                var top_y = y_fract;
                var bottom_y = 1 - y_fract;

                var top_left = (left_x * top_y);
                var top_right = (right_x * top_y);
                var bottom_left = (left_x * bottom_y);
                var bottom_right = (right_x * bottom_y);

                var parts = [
                    this.color(Math.floor(x), Math.floor(y)) * top_left,
                    this.color(Math.ceil(x), Math.floor(y)) * top_right,
                    this.color(Math.floor(x), Math.ceil(y)) * bottom_left,
                    this.color(Math.ceil(x), Math.ceil(y)) * bottom_right,
                ];

                function _sum(nums){ return _.reduce(nums, function(o, v){ return o + v}, 0) }

                return _sum(parts)/_sum([top_left, top_right, bottom_left, bottom_right]);

            }


            if (!this._data_cache) this.cache_data();

           /* return this.canvas.getContext('2d').getImageData(x, y, 1, 1).data[0]; */
            return this._data_cache[(y * this.canvas.width) + x];
        },

        render_bitmap: function (width, height) {

            return function () {
                var t = new Date();
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext('2d');
                var id = ctx.getImageData(0,0,width, height);

                var value = 0;
                _.each(id.data, function(v, index){
                   switch(index % 4){
                       case 3:
                           id.data[index] = 255;
                           break;

                       case 0:
                           value = Math.random() > 0.5 ? 255 : 0;
                           id.data[index] = value;
                           break;

                       default:
                           id.data[index] = value;
                   }
                });

                ctx.putImageData(id, 0, 0);
                /*
                var stage = new createjs.Stage(canvas);
                var r = new createjs.Shape();
             //   r.graphics.f('rgb(128,128,128)').r(0, 0, width, height).ef();
              //  stage.addChild(r);

                _.each([1, 2, 3].reverse(), function (scale) {
                    var shape = _circles_on_shape(scale, width, height);
                    shape.alpha = 0.5;
                    stage.addChild(shape);
                });

                stage.update();
                stage.removeAllChildren();

                console.log('random rendered in', (new Date().getTime() - t.getTime()), 'ms');*/

                return canvas;
            }
        }

    }


})(window);