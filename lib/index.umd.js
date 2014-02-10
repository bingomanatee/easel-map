
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('canvas'), require('./Map'), require('./Stats'), require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['_', 'Canvas', 'Map', 'Stats', 'require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.EASEL_MAP = factory(root._, root.Canvas, root.Map, root.Stats, req, exp, mod);
    }
}(this, function(_, Canvas, Map, Stats, require, exports, module) {
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
    return EASEL_MAP;
}));
