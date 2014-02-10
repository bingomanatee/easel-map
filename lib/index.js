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
        },
        average: function(){
          var args = _.toArray(arguments);
            var s = new Stats();
            s.push(args);
            return s.amean();
        }
    },
    _proto: {
    },
    class: {
    }
};

EASEL_MAP.Map = Map;