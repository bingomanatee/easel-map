(function (window) {
    var EASEL_MAP = {
        util: {
            color: function (r, g, b) {
                if (arguments.length < 3) {
                    g = b = r;
                }
                return _.template('rgb(<%= red %>, <%= green %>, <%= blue %>)', {
                        red: r,
                        green: g,
                        blue: b}
                );
            }
        },
        _proto: {
        },
        class: {
        }
    };

    window.EASEL_MAP = EASEL_MAP;
})(window);