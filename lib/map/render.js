(function (w) {


    EASEL_MAP.Map.prototype.render = function (params, canvas, stage) {

        if (!stage) {
            stage = new createjs.Stage(canvas);
        }

        _.each(this.get_layers(), function (layer) {
            layer.ensure_container(stage, true);
            if (layer.pre_render){
                layer.pre_render(stage, params);
            };
        }, this);

        _.each(this.get_layers(), function(layer){
            layer.render(stage, params);
            if (layer.post_render){
                layer.post_render(stage, params);
            }
        }, this);

        _.each(this.get_layers(), function(layer){
            if (layer.post_render){
                layer.post_render(stage, params);
            }
        }, this);

        stage.update();
        return stage;
    }

})(window);