(function (window) {

    // generates perlin based on overlapping scaled bitmaps

    EASEL_MAP.util.Perlin_Canvas = function (scale, bw, bh) {

        this.bitmap_width = bw || 200;
        this.bitmap_height = bh || 100;

        this.scales = scale;

        this.offsets = _.map(this.scales, function () {
            return [Math.random() * this.bitmap_width, Math.random() * this.bitmap_height];
        }, this);
    };


    EASEL_MAP.util.Perlin_Canvas.prototype = {

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
                shape.alpha = i ? 0.5 : 1;
                stage.addChild(shape);

                var matrix = new createjs.Matrix2D(scale, 0, 0, scale, 0,0);
                var bitmap = this.bitmaps[i];
                console.log('bitmap: ', bitmap);
                shape.graphics.bf(bitmap, 'repeat', matrix).dr(0, 0, width, height);
            }, this);

            stage.update();

        },

        color: function(x, y){
          if (x < 0 || y < 0 || x >= this.canvas.width || y >= this.canvas.height){
              return 0;
          }
            return this.canvas.getContext('2d').getImageData(x, y, 1, 1).data[0];
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