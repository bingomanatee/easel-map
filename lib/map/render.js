(function (window) {

    window.EASEL_MAP.Map.prototype.render = function (params, stage, canvas ) {

        if (!stage) {
            if (!canvas) throw new Error("must provide stage or canvas to render");
            stage = new createjs.Stage(canvas);
        }

        _.each(this.get_layers(), function (layer) {
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

        var self = this;

        $(canvas).on('mousemove', function(e){
            console.log('mousemove');
            self.event('mousemove', e);
        });
        $(canvas).on('mousedown', function(e){
            console.log('mousedown');
            self.event('mousedown', e);
        });
        $(canvas).on('mouseup', function(e){
            console.log('mouseup');
            self.event('mouseup', e);
        });
        return stage;
    }

})(window);