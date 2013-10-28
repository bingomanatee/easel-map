(function (window) {

    EASEL_MAP.Layer = function (name, map, params) {
        if (!_.isString(name)){
            throw new Error('name must be string');
        }
        this.name = name;
        this.map = map;
        _.extend(this, params);
        this.order = map.layers.length;
        this.name = name;
    };

    EASEL_MAP.Layer.prototype = {
        render:  function(){
            throw new Error('must override ');
        }
    };
})(window);