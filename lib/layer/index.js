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
    };

    EASEL_MAP.Layer.prototype = {
        render: function () {
            throw new Error('must override ');
        },

        cache: function(stage){
            if (this.container.x || this.container.y || this.container.scaleX != 1 || this.container.scaleY != 1){
                throw new Error('cannot cache offset/scaled containers');
            }
            this.container.cache(0,0,stage.canvas.width, stage.canvas.height);
        },

        ensure_container: function (stage) {
            var stage_container = stage.getChildByName(this.name);
            if (!stage_container) {
                stage_container = new createjs.Container();
                stage_container.name = this.name;
                stage.addChild(stage_container);
                this.container = stage_container;
            }
            return stage_container;
        }

    };
})(window);