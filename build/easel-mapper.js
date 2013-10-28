//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
//# sourceMappingURL=underscore-min.map;
if (typeof module == 'undefined') {
    (function (window) {
        window.HEXAGONY = {};
    })(window);
} else {
    module.exports = {
        make_hexes: require('./lib/make_hexes'),
        Hex: require('./lib/Hex'),
        draw_hexes: require('./lib/draw_hexes')
    };
};
(function (window) {
    var SIN_30 = Math.sin(Math.PI / 6);
    var COS_30 = Math.cos(Math.PI / 6);

// the orthoganal offsets of a hex with a radius to the flat side of 1.

    var UNIT_X = 1 / COS_30;
    var UNIT_Y = 2 * COS_30;

    function Hex_Point(hex, angle, index) {
        this.hex = hex;
        this.angle = angle;
        this.index = index;
    }

    Hex_Point.prototype = {

        unit_x: function () {
            return this.hex.unit_x() + Math.cos(this.angle);
        },

        unit_y: function () {
            return this.hex.unit_y() + Math.sin(this.angle);
        },

        x: function () {
            return this.hex.x() + (this.hex.long_radius() * Math.cos(this.angle));
        },

        y: function () {
            return this.hex.y() + (this.hex.long_radius() * Math.sin(this.angle));
        },

        toJSON: function () {
            return {
                index: this.index,
                angle: Math.round(this.angle * 180 / Math.PI),
                unit_x: this.hex.unit_x() + this.unit_x(),
                unit_y: this.hex.unit_y() + this.unit_y()
            };
        }
    };

    /**
     *
     * @param map
     * @param row
     * @param column
     * @constructor
     */
    function Hex(map, row, column) {
        this.map = map;
        this.row = row;
        this.column = column;
        this.radius = map.hex_size / 2;
        this.diameter = map.hex_size;

        this.make_points();
    }

    _.extend(Hex.prototype, {

        short_radius: function () {
            return this.radius;
        },

        long_radius: function () {
            return this.short_radius() / COS_30;
        },

        unit_x: function () {
            return this.column * UNIT_X;
        },

        unit_y: function () {
            return this.row * UNIT_Y - this.column % 2;
        },

        x: function () {
            return 1.5 * this.long_radius() * this.column;
        },

        row_place: function () {
            return this.row + (this.column % 2) / 2;
        },

        y: function () {
            return this.short_radius() * this.row_place() * 2;
        },

        toJSON: function () {
            return {
                row: this.row,
                column: this.column,
                unit_center: {
                    x: (this.unit_x()),
                    y: (this.unit_y())
                },
                points: this.points.map(function (p) {
                    return p.toJSON();
                })
            };
        },

        make_points: function () {
            this.points = _.range(0, Math.PI * 2, Math.PI / 3).map(function (angle, i) {
                return new Hex_Point(this, angle, i);
            }, this);
        }

    });


    if (typeof module != 'undefined') {
        module.exports = Hex;
    } else {
        window.HEXAGONY.Hex = Hex;
    }
})(window);;
(function (window) {

    if (typeof module != 'undefined') {
        var Hex = require('./Hex');
        var _ = require('underscore');
    } else {
        var Hex = HEXAGONY.Hex;
        var _ = window._;
    }

    /* ------------ CLOSURE --------------- */

    /** ********************
     * Purpose: to generate a starting hex grid for a map.
     * The hexes are flat on the top/bottom.
     * The maps are (relatively) square;
     *
     * @param map
     *          - hex_size: distance from side to side of the hexagon. also, distance between two adgacent hexagons.
     *          - map_size: (minimum) width and height of the map.
     *
     * @returns {Array}
     *  a 2D array of hexes, column/row.
     */
    function generate_hexes(map) {

        var hex_radius = map.hex_size / 2; // distance from center to flat side
        var hex_side = 2 * hex_radius / Math.sqrt(3); // size of side of hex;
        var hex_side_radius = hex_radius / Math.sqrt(3); // half the side of a hex;
        var hex_long_radius = Math.sqrt(hex_side * hex_side + hex_side_radius * hex_side_radius);

        var hex_long_diameter = 2 * hex_long_radius;
        var hex_diameter = 2 * hex_radius;

        function _eastern_column() {
            var east_distance = 0;
            var columns = 2;

            while (east_distance < map.map_size / 2) {
                columns += 2;
                east_distance += hex_long_diameter + hex_side;
            }

            return columns;
        }

        function _north_row() {
            var rows = 1;
            var north_distance = 0;

            while (north_distance < map.map_size / 2) {
                north_distance += hex_diameter;
                ++rows;
            }
            return rows;
        }

        var eastern_column = _eastern_column();
        var western_column = -1 * eastern_column;

        var north_row = _north_row();
        var south_row = -1 * north_row;

        var hexes = [];

        // console.log('columns: e %s, w %s', eastern_column, western_column);
        //  console.log('rows: n %s, s %s', north_row, south_row);

        _.range(western_column, eastern_column + 1).forEach(function (column) {
            var column_hexes = [];
            _.range(south_row, north_row + 1).forEach(function (row) {
                //console.log('column: %s, row: %s', column, row);
                column_hexes.push(new Hex(map, row - south_row, column - western_column));
            });
            hexes.push(column_hexes);
        });

        return hexes;
    }

    /* -------------- EXPORT --------------- */

    if (typeof module != 'undefined') {

        module.exports = generate_hexes;
    } else {
        HEXAGONY.generate_hexes = generate_hexes;
        var _ = window._;
    }
})(window);;
(function (window) {
    if (typeof module != 'undefined') {
        var Hex = require('./Hex');
        var _ = require('underscore');
        var Canvas = require('canvas');
    } else {
        var Hex = HEXAGONY.Hex;
    }

    /* ------------ CLOSURE --------------- */

    var DRAW_PARAMS_DEFAULTS = {
        margin: 0,

        circle: false,

        draw_hex: {
            stroke: {
                width: 1,
                color: 'black'
            },
            fill: 'white'
        }
    };

    /** ********************
     * Purpose: to draw hexagons
     *
     * @param hexes [[Hexes]]
     * @param draw_params {object}
     * @return canvas
     */
    function draw(hexes, draw_params) {

        draw_params = draw_params || DRAW_PARAMS_DEFAULTS;

        var margin = draw_params.margin;

        hexes = _.flatten(hexes);

        var p = hexes[0].points[0];

        var min_x = p.x(), max_x = p.x(), min_y = p.y(), max_y = p.y();

        hexes.forEach(function (hex) {
            hex.points.forEach(function (point) {
                min_x = Math.min(point.x(), min_x);
                max_x = Math.max(point.x(), max_x);
                min_y = Math.min(point.y(), min_y);
                max_y = Math.max(point.y(), max_y);
            });
        });

        var x_offset = margin - min_x;
        var y_offset = margin - min_y;

        var width = Math.ceil((2 * margin) + (max_x - min_x));
        var height = Math.ceil((2 * margin) + (max_y - min_y));

        console.log('width: %s, height: %s', width, height);

        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');

        ctx.lineWidth = 1;
        hexes.forEach(function (hex) {

            if (draw_params.hex) {

                if (draw_params.hex.fill) {
                    ctx.fillStyle = draw_params.hex.fill;
                    ctx.beginPath();
                    var x = hex.points[5].x() + x_offset;
                    var y = hex.points[5].y() + y_offset;

                    ctx.moveTo(x, y);
                    hex.points.forEach(function (point) {
                        var x = point.x() + x_offset;
                        var y = point.y() + y_offset;
                        ctx.lineTo(x, y);
                    });
                    ctx.closePath();
                    ctx.fill();
                }

            }

            if (draw_params.circle) {
                if (draw_params.circle.fill) {
                    ctx.fillStyle = draw_params.circle.fill;
                    ctx.beginPath();
                    ctx.arc(hex.x() + x_offset, hex.y() + y_offset, hex.radius, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }

                if (draw_params.circle.stroke) {
                    ctx.strokeStyle = draw_params.circle.stroke.color;
                    ctx.lineWidth = draw_params.circle.stroke.width;
                    ctx.beginPath();
                    ctx.arc(hex.x() + x_offset, hex.y() + y_offset, hex.radius, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            if (draw_params.hex && draw_params.hex.stroke) {


                ctx.strokeStyle = draw_params.hex.stroke.color;
                ctx.lineWidth = draw_params.hex.stroke.width;
                ctx.beginPath();
                var x = hex.points[5].x() + x_offset;
                var y = hex.points[5].y() + y_offset;

                ctx.moveTo(x, y);
                hex.points.forEach(function (point) {
                    var x = point.x() + x_offset;
                    var y = point.y() + y_offset;
                    ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.stroke();

            }

        });

        return canvas;
    }

    /* -------------- EXPORT --------------- */

    if (typeof module != 'undefined') {
        module.exports = draw;
    }
})(window);;
var EASEL_MAP = {
    util: {}
};;
(function (window) {

    function _grid_extent(unit, scale,
                          width, height,
                          left, top) {
        var scaled_width = width / scale;
        var scaled_height = height / scale;

        var leftmost_index = Math.floor(left / unit);
        var topmost_index = Math.floor(top / unit);
        var index_width = scaled_width / unit;
        var index_height = scaled_height / unit;

        return {
            left_i: leftmost_index,
            right_i: Math.ceil(leftmost_index + index_width) + 1,
            top_j: topmost_index,
            bottom_j: Math.ceil(topmost_index + index_height) + 1
        }

    }

    if (typeof(module) == 'undefined') {
        EASEL_MAP.util.grid_extent = _grid_extent;
    } else {
        module.exports = _grid_extent;
    }

})(window);;
(function (w) {

    EASEL_MAP.Map = function (params) {
       this.init();
        _.extend(this, params);

    };

    EASEL_MAP.Map.prototype = {
        init: function () {
            this.paths = [];
            this.regions = [];
            this.spots = [];
            this.units = 'm';
            this.layers = {};
        },

        get_layers: function(){
          return _.sortBy(_.values(this.layers), 'order');
        },

        add_layer: function(layer){
            if (this.layers[layer.name]){
                throw new Error('already have a layer ' + name);
            }
            this.layers[layer.name] = layer;
        },

        ensure_layer: function(layer, stage){
            var stage_container = stage.getChildByName(layer.name);
            if (!stage_container){
                stage_container = new createjs.Container();
                stage_container.name = layer.name;
                stage.addChild(stage_container);
                layer.container = stage_container;
            }
            return stage_container;
        }
    };

})(window);;
(function (w) {


    EASEL_MAP.Map.prototype.render = function (params, canvas, stage) {

        if (!stage) {
            stage = new createjs.Stage(canvas);
        }

        _.each(this.get_layers(), function (layer) {
            this.ensure_layer(layer, stage, true).removeAllChildren();
            layer.render(stage, params);
        }, this);

        stage.update();
        return stage;
    }

})(window);;
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
})(window);;
(function (w) {

    function _render(params) {

        return function (stage, render_params) {
            var gp = this.grid_params;
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});
            var scale = render_params.scale || 1;

            this.container.x = -render_params.left * scale;
            this.container.y = -render_params.top * scale;

            var map = {
                hex_size: gp.hex_size * scale,
                map_size: Math.max(stage.canvas.width, stage.canvas.height) * 2.25
            };

            var hexes = _.flatten(HEXAGONY.generate_hexes(map));
            this.hexes = hexes;
            console.log('hexes:', hexes);

            var hex_shape = new createjs.Shape();
            hex_shape.graphics.s(gp.line_color).ss(1 / scale);

            var x_offset = ( stage.canvas.width * scale / (-2)) - this.container.x;
            var y_offset = ( stage.canvas.height * scale / (-2)) - this.container.y;

            console.log('x offset: ', x_offset, 'y offset: ', y_offset);

            _.each(hexes, function (hex) {
                hex._x_offset = x_offset + render_params.left;
                hex._y_offset = y_offset + render_params.top;

                console.log('hex center: ', Math.round(hex.x()), Math.round(hex.y()));
                _.each(hex.points, function (point, i) {
                    if (i) {
                        hex_shape.graphics.lt(point.x() + x_offset, point.y() + y_offset);
                    } else {
                        hex_shape.graphics.mt(point.x() + x_offset, point.y() + y_offset);
                    }
                });

                hex_shape.graphics.lt(hex.points[0].x() + x_offset, hex.points[0].y() + y_offset);

                if (gp.labels &&
                    (!(hex.row % gp.label_increment))
                    &&
                    (!(hex.column % gp.label_increment))
                    ) {

                    coords = Math.round(hex.x() + x_offset) + ',' + Math.round(hex.y() + y_offset);

                    var label_shape = new createjs.Text(coords, (10/scale) + 'pt Sans-Serif', 'black');
                    label_shape.x = hex.x() + x_offset;
                    label_shape.y = hex.y() + y_offset;
                    label_shape.textAlign = 'center';
                    label_shape.textBaseline = 'middle';

                    this.container.addChild(label_shape);
                }
            }, this);

            this.container.addChild(hex_shape);



            this.container.scaleX = this.container.scaleY = scale;
        }
    }


    var _default_grid_params = {
        hex_size: 50,
        labels: true,
        label_increment: 6,
        line_color: 'rgb(51,153,255)',
        axis_line_color: 'rgb(255,51,204)',
        heavy_line_color: 'rgb(0,0,102)'
    };
    EASEL_MAP.hex_layer = function (name, map, params) {
        if (!params) {
            params = {grid_params: {}};
        } else if (!params.grid_params) {
            params.grid_params = {};
        }

        _.defaults(params.grid_params, _default_grid_params);

        var grid_layer = new EASEL_MAP.Layer(name, map, params);

        grid_layer.render = _render(params);

        map.add_layer(grid_layer);

        return grid_layer

    };


})(window);
(function (w) {

    function _render(params) {

        return function (stage, render_params) {
            var gp = this.grid_params;
            var scale = render_params.scale || 1;

            var gridline_shape = new createjs.Shape();
            gridline_shape.graphics.s(gp.line_color).ss(1 / scale);
            var axis_shape = new createjs.Shape();
            axis_shape.graphics.s(gp.axis_line_color).ss(2 / scale);

            if (render_params.heavy_freq){
                var gridline_h_shape = new createjs.Shape();
                gridline_h_shape.graphics.s(gp.heavy_line_color).ss(1 / scale);

                this.container.addChild(gridline_h_shape);
            }

            var grid_extent = EASEL_MAP.util.grid_extent(
                gp.unit, scale,
                stage.canvas.width, stage.canvas.height,
                render_params.left,
                render_params.top
            );

            var top = grid_extent.top_j * gp.unit;
            var bottom = grid_extent.bottom_j * gp.unit;
            var left = grid_extent.left_i * gp.unit;
            var right = grid_extent.right_i * gp.unit;

            console.log('render_params:', render_params, 'grid params: ', gp, ', grid extent:', grid_extent);

            for (var i = grid_extent.left_i; i <= grid_extent.right_i; ++i) {

                var x = i * gp.unit;
                console.log('drawing gridline at ', x);

                (i == 0 ? axis_shape : (
                    render_params.heavy_freq && (!(i % render_params.heavy_freq)) ?  gridline_h_shape: gridline_shape
                    )).graphics.mt(x, top).lt(x, bottom);
            }
            for (var j = grid_extent.top_j  ; j <= grid_extent.bottom_j; ++j) {

                var y = j * gp.unit;
                console.log('drawing gridline at y ', y);

                (j == 0 ? axis_shape : (
                    render_params.heavy_freq && (!(j % render_params.heavy_freq)) ?  gridline_h_shape: gridline_shape
                    )).graphics.mt(left, y).lt(right, y);
            }


            this.container.addChild(gridline_shape);
            this.container.addChild(axis_shape);
            this.container.x = -render_params.left * scale;
            this.container.y = -render_params.top * scale;

            this.container.scaleX = this.container.scaleY = scale;
        }
    }


    var _default_grid_params = {
        unit: 50,
        line_color: 'rgb(51,153,255)',
        axis_line_color: 'rgb(255,51,204)',
        heavy_line_color:'rgb(0,0,102)'
    };
    EASEL_MAP.grid_layer = function (name, map, params) {
        if (!params){
            params = {grid_params: {}};
        } else if (!params.grid_params){
            params.grid_params = {};
        }

        _.defaults(params.grid_params, _default_grid_params);

        var grid_layer = new EASEL_MAP.Layer(name, map, params);

        grid_layer.render = _render(params);

        map.add_layer(grid_layer);

        return grid_layer

    };


})(window)