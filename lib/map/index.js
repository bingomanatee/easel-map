(function (w) {

    EASEL_MAP.Map = function (params) {
       this.init();
        _.extend(this, params);

    };

    EASEL_MAP.Map.prototype = {
        init: function () {
            this.paths = [];
            this.regions = [];
            this.spots = [];
            this.units = 'm';
            this.layers = {};
        },

        get_layers: function(){
          return _.sortBy(_.values(this.layers), 'order');
        },

        add_layer: function(layer){
            if (this.layers[layer.name]){
                throw new Error('already have a layer ' + name);
            }
            this.layers[layer.name] = layer;
        },

        ensure_layer: function(layer, stage){
            var stage_container = stage.getChildByName(layer.name);
            if (!stage_container){
                stage_container = new createjs.Container();
                stage_container.name = layer.name;
                stage.addChild(stage_container);
                layer.container = stage_container;
            }
            return stage_container;
        }
    };

})(window);