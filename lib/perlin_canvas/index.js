(function (window) {
    EASEL_MAP.util.Perlin_Canvas = function (scale_count, bw, bh) {
        this.scale_count = scale_count;
        this.bitmap_width = bw || 200;
        this.bitmap_height = bh || 100;

        this.scales = _.reduce(_.range(0, scale_count), function (out, index) {
            var n = _.last(out);
            n *= _.first(_.shuffle([1.25, 1.5, 1.75, 2, 2.5, 3]));
            out.push(n);
            return out;
        }, [0.25]);

        this.offsets = _.map(this.scales, function () {
            return [Math.random() * this.bitmap_width, Math.random() * this.bitmap_height];
        }, this);
    };

    var INCREMENT = 7;

    var MIN_RADIUS = 1;
    var MAX_RADIUS = 5;
    var RADIUS_POWER = 0.75;

    function _random_radius() {
        return Math.pow(Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS, RADIUS_POWER);
    }

    var _grey = _.template('rgb(<%= grey %>, <%= grey %>, <%= grey %>)');

    function _random_grey(alpha) {
        var grey = Math.floor(Math.random() * 255);
        return _grey({grey: grey, alpha: alpha});
    }

    function _circles_on_shape(scale, width, height) {
        var shape = new createjs.Shape();
        _.each(_.shuffle(_.range(-MAX_RADIUS * 4, width + MAX_RADIUS * 4, INCREMENT)), function (x) {
            _.each(_.shuffle(_.range(-MAX_RADIUS * 2, height + MAX_RADIUS, INCREMENT)), function (y) {
                x += Math.random() * INCREMENT - INCREMENT/2;
                y += Math.random() * INCREMENT - INCREMENT/2;
                shape.graphics.f(_random_grey((Math.random() + Math.random())))
                    .dc(x, y, _random_radius()).ef();
            })
        });
        var s = Math.max(2, scale * 2);
        shape.filters = [
            new createjs.BlurFilter(s, s, 2),
            new createjs.ColorFilter(2, 2, 2, 1,-120,-120, -120)
        ];

        shape.cache(0, 0, width, height);

        return shape;
    }

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

            _.each(_.range(0, this.scale_count), function (scale, i) {

                var a_canvas = document.createElement('canvas');
                var a_stage = new createjs.Stage(a_canvas);
                a_stage.addChild(_circles_on_shape(2, width, height));
                a_stage.update();

                var shape = new createjs.Shape();
                shape.alpha = i ? 0.5 : 1;
                stage.addChild(shape);

                var matrix = new createjs.Matrix2D((scale + 1) / 4, 0, 0, (scale + 1) / 4, this.offsets[scale][0], this.offsets[scale][1]);

                shape.graphics.bf(this.bitmaps[scale], 'repeat', matrix).dr(0, 0, width, height);
            }, this);

            stage.update();

        },

        render_bitmap: function (width, height) {

            return function () {
                var t = new Date();
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

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

                console.log('random rendered in', (new Date().getTime() - t.getTime()), 'ms');
                return canvas;
            }
        }

    }


})(window);