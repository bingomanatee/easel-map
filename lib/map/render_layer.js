(function (window) {

    window.EASEL_MAP.Map.prototype.render_layer = function (layer, params, stage, canvas) {

        if (_.isString(layer)) {
            layer = this.layers[layer];
        }

        if (!layer) {
            throw new Error('cannot get layer ' + layer);
        }

        if (!stage) {
            if (!canvas) throw new Error("must provide stage or canvas to render");
            stage = new createjs.Stage(canvas);
        }

        if (params) {
            layer.set_coordinates(stage, params);
        }

        if (layer.pre_render) {
            console.log('rendering prerender for ', layer.name);
            layer.pre_render(stage, params);
        } else {
            console.log('no prerender for ', layer.name);
        }

        layer.render(stage, params);

        if (layer.post_render) {
            layer.post_render(stage, params);
        }

        if (!layer.events_updated) {
            layer.update_events();
            layer.events_updated = true;
        }

        stage.update();
        return stage;
    }

})(window);