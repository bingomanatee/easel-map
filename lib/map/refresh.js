(function (window) {

    window.EASEL_MAP.Map.prototype.refresh = function (layer_names ) {

        _.each(this.layers, function(layer){
            if (!layer_names || _.contains(layer_names, layer.name)){
                layer.refresh();
            }
        })
    }

})(window);