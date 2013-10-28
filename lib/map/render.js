(function (w) {


    EASEL_MAP.Map.prototype.render = function (params, canvas, stage) {

        if (!stage) {
            stage = new createjs.Stage(canvas);
        }

        _.each(this.get_layers(), function (layer) {
            this.ensure_layer(layer, stage, true).removeAllChildren();
            layer.render(stage, params);
        }, this);

        stage.update();
        return stage;
    }

})(window);