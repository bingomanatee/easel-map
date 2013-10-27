(function (w) {

    EASEL_MAP.View = function (map, params) {
        this.map = map;
        _.extend(this, params);

    };

    EASEL_MAP.View.prototype = {
        render: function(location, filter){

        }
    };


})(window)