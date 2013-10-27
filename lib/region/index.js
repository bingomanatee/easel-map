(function (w) {

    EASEL_MAP.Region = function (params) {
        this.init();
        _.extend(this, params);

    };

    EASEL_MAP.Region.prototype = {
        init: function () {
            this.points = [];
            this.region_type = 'unknown';
        }
    };


})(window);