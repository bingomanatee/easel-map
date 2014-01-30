(function (window) {

    window.EASEL_MAP.Map.prototype.render = function (params, stage, canvas) {

        if (!stage) {
            if (!canvas) throw new Error("must provide stage or canvas to render");
            stage = new createjs.Stage(canvas);
        }

        _.each(this.get_layers(), function (layer) {
            layer.set_coordinates(stage, params);
        }, this);

        _.each(this.get_layers(), function (layer) {
            if (layer.pre_render) {
                console.log('rendering prerender for ', layer.name);
                layer.pre_render(stage, params);
            } else {
                console.log('no prerender for ', layer.name);
            }
        }, this);

        _.each(this.get_layers(), function (layer) {
            layer.render(stage, params);
            if (layer.post_render) {
                layer.post_render(stage, params);
            }

            if (!layer.events_updated) {
                layer.update_events();
                layer.events_updated = true;
            }
        }, this);
        stage.update();
        return stage;
    }

})(window);