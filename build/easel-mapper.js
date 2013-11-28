//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
//# sourceMappingURL=underscore-min.map;
var EASEL_MAP = {
    util: {
        color: function (r, g, b) {
            if (arguments.length < 3){
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

    var _defaults = {
        top: -3250,
        bottom: 3250,
        left: -6500,
        right: 6500
    };

    EASEL_MAP.Map = function (params) {
        this.init();
        _.defaults(this, _defaults);
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

        get_layers: function (reverse) {
            var out = _.sortBy(_.values(this.layers), 'order');
            if (reverse) {
                return out.reverse();
            } else {
                return out;
            }
        },

        add_layer: function (layer, params) {
            if (_.isString(layer)) {
                if (this.layers[layer]) {
                    throw new Error('already have a layer ' + name);
                }
                layer = this.layers[layer] = new EASEL_MAP.Layer(layer, this, params || {});
            } else if (this.layers[layer.name]) {
                throw new Error('already have a layer ', layer.name);
            } else {
                this.layers[layer.name] = layer;
            }

            return layer;

        },

        event: function (name, e) {
            var bubbles = this.get_layers(true);

            var handled = false;

            _.each(bubbles, function (layer) {
                if (!handled) {
                    handled = layer.event(name, e);
                }
            })
        }

    };

})(window);;
(function (w) {


    EASEL_MAP.Map.prototype.render = function (params, stage, canvas ) {

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

})(window);;
(function (window) {
    EASEL_MAP.util.Perlin_Canvas = function (scale_count, bw, bh) {
        this.scale_count = scale_count;
        this.bitmap_width = bw || 200;
        this.bitmap_height = bh || 100;

        this.scales = _.reduce(_.range(0, scale_count), function (out, index) {
            var n = _.last(out);
            n *= _.first(_.shuffle([1.25, 1.5, 1.75, 2, 2.5, 3]));
            out.push(n);
            return out;
        }, [0.25]);

        this.offsets = _.map(this.scales, function () {
            return [Math.random() * this.bitmap_width, Math.random() * this.bitmap_height];
        }, this);
    };

    var INCREMENT = 7;

    var MIN_RADIUS = 1;
    var MAX_RADIUS = 5;
    var RADIUS_POWER = 0.75;

    function _random_radius() {
        return Math.pow(Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS, RADIUS_POWER);
    }

    var _grey = _.template('rgb(<%= grey %>, <%= grey %>, <%= grey %>)');

    function _random_grey(alpha) {
        var grey = Math.floor(Math.random() * 255);
        return _grey({grey: grey, alpha: alpha});
    }

    function _circles_on_shape(scale, width, height) {
        var shape = new createjs.Shape();
        _.each(_.shuffle(_.range(-MAX_RADIUS * 4, width + MAX_RADIUS * 4, INCREMENT)), function (x) {
            _.each(_.shuffle(_.range(-MAX_RADIUS * 2, height + MAX_RADIUS, INCREMENT)), function (y) {
                x += Math.random() * INCREMENT - INCREMENT/2;
                y += Math.random() * INCREMENT - INCREMENT/2;
                shape.graphics.f(_random_grey((Math.random() + Math.random())))
                    .dc(x, y, _random_radius()).ef();
            })
        });
        var s = Math.max(2, scale * 2);
        shape.filters = [
            new createjs.BlurFilter(s, s, 2),
            new createjs.ColorFilter(2, 2, 2, 1,-120,-120, -120)
        ];

        shape.cache(0, 0, width, height);

        return shape;
    }

    EASEL_MAP.util.Perlin_Canvas.prototype = {

        render: function (width, height) {

            this.bitmaps = _.map(this.scales, this.render_bitmap(this.bitmap_width, this.bitmap_height), this);

            this.canvas = document.createElement('canvas');
            this.canvas.width = width;
            this.canvas.height = height;

            var r = new createjs.Shape();
            r.graphics.f('rgb(128,128,128)').dr(0,0,width, height);

            var stage = new createjs.Stage(this.canvas);
            stage.addChild(r);

            _.each(_.range(0, this.scale_count), function (scale, i) {

                var a_canvas = document.createElement('canvas');
                var a_stage = new createjs.Stage(a_canvas);
                a_stage.addChild(_circles_on_shape(2, width, height));
                a_stage.update();

                var shape = new createjs.Shape();
                shape.alpha = i ? 0.5 : 1;
                stage.addChild(shape);

                var matrix = new createjs.Matrix2D((scale + 1) / 4, 0, 0, (scale + 1) / 4, this.offsets[scale][0], this.offsets[scale][1]);

                shape.graphics.bf(this.bitmaps[scale], 'repeat', matrix).dr(0, 0, width, height);
            }, this);

            stage.update();

        },

        color: function(x, y){
          if (x < 0 || y < 0 || x >= this.canvas.width || y >= this.canvas.height){
              return 0;
          }
            return this.canvas.getContext('2d').getImageData(x, y, 1, 1).data[0];
        },

        render_bitmap: function (width, height) {

            return function () {
                var t = new Date();
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                var stage = new createjs.Stage(canvas);
                var r = new createjs.Shape();
             //   r.graphics.f('rgb(128,128,128)').r(0, 0, width, height).ef();
              //  stage.addChild(r);

                _.each([1, 2, 3].reverse(), function (scale) {
                    var shape = _circles_on_shape(scale, width, height);
                    shape.alpha = 0.5;
                    stage.addChild(shape);
                });

                stage.update();
                stage.removeAllChildren();

                console.log('random rendered in', (new Date().getTime() - t.getTime()), 'ms');
                return canvas;
            }
        }

    }


})(window);;
(function (window) {

    EASEL_MAP.Layer_Tile = function (layer, i, j) {
        this.layer = layer;
        this.i = i;
        this.j = j;

        this.layer.tiles.push(this);
        this.loaded = false;
    }

    EASEL_MAP.Layer_Tile.prototype = {

        load: function () {
            this.container().removeAllChildren();
            this.layer.add_tile_shapes(this);
            this.cache();
            this.loaded = true;
        },

        move_around: function (x, y) {
            var xd, yd;
            while (xd = this._x_d(x)) {
                this.i += xd;
            }
            while (yd = this._y_d(y)) {
                this.j += yd;
            }
        },

        _x_d: function (x) {
            var left = this.left();
            var right = this.right();

            if (x < left) {
                return -1;
            } else if (x > right) {
                return 1;
            } else {
                return 0;
            }
        },

        _y_d: function (y) {
            var top = this.top();
            var bottom = this.bottom();
            if (y < top) {
                return -1;
            } else if (y > bottom) {
                return 1;
            } else {
                return 0;
            }
        },

        cache: function (scale) {
            this.container().cache(
                Math.floor(this.left() - 1),
                Math.floor(this.top() - 1),
                Math.ceil(this.width() + 2),
                Math.ceil(this.height() + 2),
                scale
            );
        },

        left: function () {
            return this.i * this.width();
        },

        top: function () {
            return this.j * this.height();
        },

        right: function () {
            return this.left() + this.width();
        },

        bottom: function () {
            return this.top() + this.height();
        },

        width: function () {
            return this.layer.tile_width();
        },

        height: function () {
            return this.layer.tile_height();
        },

        container: function () {
            if (!this._container) {
                this._container = new createjs.Container();
                this.layer.offset_layer().addChild(this._container);
            }
            return this._container;
        },

        contains: function (range) {
            if (this.left() >= range.right) {
                console.log('left', this.left(), '>= range.right', range.right);
                return false;
            }
            if (this.right() <= range.left) {
                console.log('right', this.right(), '<= range.left', range.left);
                return false;
            }
            if (this.top() >= range.bottom) {
                console.log('top', this.top(), '>= range.bottom', range.bottom);
                return false;
            }
            if( this.bottom() <= range.top){
                console.log('bottom', this.bottom(), '<= range.top', range.top);
                return false;
            }
            return true;
        }

    }


})(window);;
(function (window) {

    EASEL_MAP.Layer = function (name, map, params) {
        if (!_.isString(name)) {
            throw new Error('name must be string');
        }
        this.name = name;
        this.map = map;
        _.extend(this, params);
        this.order = map.layers.length;
        this.name = name;
        this.events = {};
        this.tiles = [];
    };

    EASEL_MAP.Layer.prototype = {

        pre_render: function (stage, params) {
            this.set_stage(stage);
            if (params.hasOwnProperty('left')) {
                this.offset_layer().x = params.left;
            }
            if (params.hasOwnProperty('top')) {
                this.offset_layer().y = params.top;
            }
            if (params.hasOwnProperty('scale')){
                var gc = this.scale_layer();
                gc.scaleX = gc.scaleY = this.scale(params.scale);
            }
        },
        render: function (stage, params) {
            this.set_stage(stage);
            var tiles = this.retile();

            _.each(tiles, function (tile) {
                if (!tile.loaded) {
                    tile.load();
                }
            }, this);
        },

        cache: function (stage) {
            if (this.container.x || this.container.y || this.container.scaleX != 1 || this.container.scaleY != 1) {
                throw new Error('cannot cache offset/scaled containers');
            }
            this.container.cache(0, 0, stage.canvas.width, stage.canvas.height);
        },

        tile_width: function () {
            return 200;
        },

        tile_height: function () {
            return 200;
        },

        scale_layer: function () {
            if (!this._scale_layer) {
                this._scale_layer = new createjs.Container();
                this.stage_layer().addChild(this._scale_layer);
            }
            return this._scale_layer;
        },

        offset_layer: function () {
            if (!this._offset_layer) {
                this._offset_layer = new createjs.Container();
                this.scale_layer().addChild(this._offset_layer);
            }
            return this._offset_layer;
        },

        scale: function (s) {
            if (arguments.length > 0) {
                this._scale = s;
            }
            return this._scale;
        },

        render_sublayers: function (render_params) {
            this.scale(render_params.scale || 1);
            var gc = this.scale_layer();
            gc.scaleX = gc.scaleY = this.scale();
            var gct = this.grid_container_t;
            gct.x = render_params.left;
            gct.y = render_params.top;
        },

        set_stage: function (stage) {
            this.stage = stage;
        },

        stage_layer: function () {
            if (!this.container) {
                var stage_container = this.stage.getChildByName(this.name);
                if (!stage_container) {
                    stage_container = new createjs.Container();
                    stage_container.name = this.name;
                    this.stage.addChild(stage_container);
                }
                this.container = stage_container;
            }
            return this.container;
        },

        event: function (name, e) {
            if (this.events[name]) {
                console.log('handling event ', name);
                return this.events[name](e);
            } else {
                console.log('no handler for event ', name);
                return false;
            }
        },

        local_tl: function () {
            return this.offset_layer().globalToLocal(0, 0);
        },

        local_br: function () {
            return this.offset_layer().globalToLocal(this.stage.canvas.width, this.stage.canvas.height);
        },

        tile_range: function () {
            var tl = this.tile(0, 0);
            var ltl = this.local_tl();

            ltl.x = Math.max(this.map.left, ltl.x);
            ltl.y = Math.max(this.map.top, ltl.y);

            tl.move_around(ltl.x, ltl.y);

            var br = this.tile(tl.i, tl.j);
            var lbr = this.local_br();

            lbr.x = Math.min(this.map.right,lbr.x);
            lbr.y = Math.min(this.map.bottom, lbr.y);

            br.move_around(lbr.x, lbr.y);



            return {tl: tl, br: br};
        },

        tile: function (x, y) {
            return new EASEL_MAP.Layer_Tile(this, x, y);
        },

        add_tile_shapes: function (tile) {

        },

        retile: function () {
            // return;
            var tr = this.tile_range();

            var left = tr.tl.i;
            var right = tr.br.i;
            var top = tr.tl.j;
            var bottom = tr.br.j;

            var old_tiles = this.tiles.filter(function (tile) {
                return tile.i >= left &&
                    tile.i <= right &&
                    tile.j >= top &&
                    tile.j <= bottom;
            });

            var self = this;
            _.each(_.range(left, right + 1), function (i) {
                _.each(_.range(top, bottom + 1), function (j) {
                    var old_tile = _.find(old_tiles, function (tile) {
                        return tile.i == i && tile.j == j;
                    });
                    if (!old_tile) {
                        old_tiles.push(this.tile(i, j));
                    }
                }, this);
            }, this)
            return old_tiles;
        }

    };
})(window);;
(function () {

    function _rc() {
        return _.shuffle(['red', 'green', 'blue', 'cyan', 'magenta', 'orange'])[0];
    }

    var COS_30 = Math.cos(Math.PI / 6);
    var SIN_30 = Math.sin(Math.PI / 6);
    var COS_30_x_2 = COS_30 * 2;
    var COS_30_x_3 = COS_30 * 3;
    var COS_30_x_3_div_2 = COS_30 * 3 / 2;
    var COS_30_div_2 = COS_30 / 2;

    var CACHED_HEXES = {};

    /**
     * Hex_Cell is a polygon circumscribed in a circle
     * defined by its center and hex_size radius.
     *
     * The center is computed by its position on a "jagged grid".
     * The hexagon's points are aligned so that they start at the left
     * and right corners (3 and 9 o'clock), so it's flat on the top and bottom.
     *
     * @param i - the index of the row(x) position
     * @param j - the index of the column (y) position
     * @param hex_size - the distance from the center to any point.
     * @constructor
     */

    EASEL_MAP.class.Hex_Cell = function (i, j, hex_size) {
        this.hex_size = hex_size;
        this.row = i;
        this.col = j;
        this.events = {};
    };


    EASEL_MAP.class.Hex_Cell.prototype = {

        event: function (name, e) {
            if (this.events[name]) {
          //      console.log('handling cell event ', name);
                return this.events[name](e);
            } else {
            //    console.log('NOT handling cell event', name);
                return false;
            }
        },

        calc_points: function (scale) {
            if (!scale) scale = 1;
            if (this.points) {
                return this.points;
            }
            var xs = [
                -this.hex_size * scale,
                -this.hex_size * SIN_30 * scale,
                this.hex_size * SIN_30 * scale,
                this.hex_size * scale
            ];

            var ys = [
                -this.hex_size * COS_30 * scale,
                0,
                this.hex_size * COS_30 * scale];

            this.points = [
                {x: xs[0], y: ys[1]} ,
                {x: xs[1], y: ys[0]},
                {x: xs[2], y: ys[0]},
                {x: xs[3], y: ys[1]},
                {x: xs[2], y: ys[2]},
                {x: xs[1], y: ys[2]}
            ];

            // console.log('points: ', this.points);
            return this.points;
        },

        ij_index: function () {
            return Math.floor(this.row / 10) + '_' + Math.floor(this.col / 10);
        },

        center: function () {
            return {x: this.center_x(), y: this.center_y()};
        },

        clone: function () {
            return new EASEL_MAP.class.Hex_Cell(this.row, this.col, this.hex_size);
        },

        circle_fill: function (container, color, shape, scale, cache) {
            var refresh = (!shape) || (!shape.graphics);
            if (refresh) {
                shape = new createjs.Shape();
                shape.x = this.center_x();
                shape.y = this.center_y();
                shape.graphics.clear();
                container.addChild(shape);
            }
            shape.graphics.f(color);

            shape.graphics.dc(0, 0, this.hex_size * ((1 + COS_30) / 2));

            if (refresh) {
                var extent = Math.ceil(this.hex_size) + 1;
                if (cache) shape.cache(-extent, -extent, 2 * extent, 2 * extent, scale);
            }

            return shape;
        },

        outline: function (container, color, width, scale) {
            var shape = new createjs.Shape();
            var text = new createjs.Text(this.row + ',' + this.col, (this.hex_size / 2) + 'px Arial', 'black');
            text.x = shape.x = this.center_x();
            text.y = shape.y = this.center_y();
            shape.graphics.ss(width, 'round', 10, true).s(color);
            var points = this.calc_points();

            shape.graphics.mt(_.last(points).x, _.last(points).y);
            _.each(points, function (point) {
                shape.graphics.lt(point.x, point.y);

            });
            shape.graphics.es();
            // container.addChild(text);
            container.addChild(shape);
            return shape;
        },

        _make_hex: function (color) {
            var shape = new createjs.Shape();
            shape.graphics.f(color);
            var points = this.calc_points();

            shape.graphics.mt(_.last(points).x, _.last(points).y);
            _.each(points, function (point) {
                shape.graphics.lt(point.x, point.y);

            });

            var extent = Math.ceil(this.hex_size) + 1;

            shape.cache(-extent, -extent, 2 * extent, 2 * extent);
            CACHED_HEXES[color] = shape.cacheCanvas;
        },


        draw_scale: function (scale) {
            var size = scale * this.hex_size;
            if (size > 50) {
                return 3;
            } else if (size > 20) {
                return 2;
            } else if (size > 10) {
                return 1;
            } else {
                return 0;
            }
        },

        render: function (render_params, fc, events) {
            var color = this.fill_color(render_params);
            var scale = render_params.scale;
            var goc = this.outlines_container;
            switch (this.draw_scale(scale)) {
                case 3:
                    this.outline(goc, this.stroke_color(render_params), this.stroke_width(render_params), null, scale);
                    this.fill_shape = this.fill(fc, color, null, scale);
                    break;

                case 2:
                    this.fill_shape = this.fill(fc, color, null, scale);
                    break;

                case 1:
                    this.fill_shape = this.circle_fill(fc, color, null, scale);
                    break;

                default:
                    this.fill_shape = this.circle_fill(fc, color, null, scale);

            }
        },

        equals: function (cell) {
            return cell.row == this.row && cell.col == this.col;
        },

        add_events: function (events) {
            var cell = this;
            this.fill_shape.removeAllEventListeners();

            if (events.on_click) {
                this.fill_shape.addEventListener('click', function (e) {
                    events.on_click(e, cell);
                });
            }
            if (events.on_down) {
                this.fill_shape.addEventListener('mousedown', function (e) {
                    events.on_down(e, cell);
                });
            }
            if (events.on_up) {
                this.fill_shape.addEventListener('mouseup', function (e) {
                    events.on_up(e, cell);
                });
            }
            if (events.on_pressup) {
                this.fill_shape.addEventListener('pressup', function (e) {
                    events.on_pressup(e, cell);
                });
            }
            if (events.on_over) {
                this.fill_shape.addEventListener('mouseover', function (e) {
                    events.on_over(e, cell);
                });
            }
        },

        fill: function (container, color, shape, scale, cache) {

            if (!CACHED_HEXES[color]) {
                this._make_hex(color);
            }

            var refresh = (!shape) || (!shape.image);
            if (refresh) {
                shape = new createjs.Bitmap(CACHED_HEXES[color]);
                shape.x = this.center_x() - (this.hex_size );
                shape.y = this.center_y() - (this.hex_size);
                container.addChild(shape);
            } else {
                shape.image = CACHED_HEXES[color].image;
            }
            return shape;
        },

        bound: function (shape) {
            shape.setBounds(Math.floor(this.center_x() - this.hex_size) - 1,
                Math.floor(this.center_y() - this.hex_size * COS_30) - 1,
                2 * Math.ceil(this.hex_size) + 2,
                2 * Math.ceil(COS_30 * this.hex_size) + 2
            )
            return shape.getBounds();
        },

        center_x: function () {
            return this.col * this.col_unit();
        },

        col_unit: function () {
            return this.hex_size * (1 + SIN_30);
        },

        row_unit: function () {
            return this.hex_size * (2 * COS_30);
        },

        center_y: function () {
            var k = this.row;
            if (this.col % 2) {
                k -= 0.5;
            }
            return k * this.row_unit();
        },

        global: function (container) {
            return container.localToGlobal(this.center_x(), this.center_y());
        },

        stroke_color: function (render_params) {
            if (render_params.stroke_color) {
                if (_.isFunction(render_params.stroke_color)) {
                    return render_paramms.stroke_color(this);
                } else {
                    return render_params.stroke_color;
                }
            } else {
                return 'black';
            }
        },

        fill_color: function (render_params) {
            if (render_params.fill_color) {
                if (_.isFunction(render_params.fill_color)) {
                    return render_params.fill_color(this);
                } else {
                    return render_params.fill_color;
                }
            } else {
                return 'grey';
            }
        },

        stroke_width: function (render_params) {
            var base = 1;
            if (render_params.stroke_width) {
                if (_.isFunction(render_params.stroke_width)) {
                    base = render_paramms.stroke_width(this);
                } else {
                    base = render_params.stroke_width;
                }
            }
            return base;// / render_params.scale;
        }

    };

})(window);;
(function (window) {

    EASEL_MAP._proto.hex_layer = {
        /**
         * ensures that there is a grid_container that can be scaled.
         * within the grid container is grid_container_t that can be offset.
         * within grid_container_t are two containers,
         *   - the fill container and the outline container.
         *   - a fill_paint_container for faster drawing of strokes.
         *   - the outline can be cached every time the position/scale has not changed.
         * @returns {Container}
         *
         * @param stage {createjs.Stage}
         * @param params {Object}
         * @returns {Container|*}
         */
        reset: function (stage, params) {
            if (this.grid_container) {
                this.grid_container_t.removeAllChildren();
            } else {
                this.grid_container = new createjs.Container();
                this.grid_container.name = 'grid';
                this.container.addChild(this.grid_container);

                this.grid_container_t = new createjs.Container();
                this.grid_container_t.name = 'grid_t';
                this.grid_container.addChild(this.grid_container_t);
            }

            var fills = new createjs.Container();
            fills.name = 'fills';
            this.grid_container_t.addChild(fills);
            this.fill_container = fills;

            var paint = new createjs.Container();
            this.grid_container_t.addChild(paint);
            this.paint_container = paint;

            var outlines = new createjs.Container();
            outlines.name = 'outlines';
            this.grid_container_t.addChild(outlines);
            this.outlines_container = outlines;


        },

        group_cells: function () {
            var self = this;
            this.fill_container.removeAllChildren();
            var groups = this.cells.reduce(function (out, cell) {

                if (!out[cell.ij_index()]) {
                    out[cell.ij_index()] = [];
                }

                out[cell.ij_index()].push(cell);

                return out;

            }, {});
        //    console.log('cells: ', this.cells.length);

            this.fill_group_containers = {};
            _.each(groups, function (cells, name) {
                var group_container = new createjs.Container();
                group_container.cells = cells;
                group_container.name = name;

                group_container.$event = function(name, e){
                    var cell = self.nearest_cell(group_container,e);
                    return cell.event(name, e);
                };

                this.fill_container.addChild(group_container);
                this.fill_group_containers[name] = group_container;

                cells.forEach(function (cell) {
                    group_container.addChild(cell.fill_shape);
                    cell.group_container = group_container;
                });

                this.set_gc_range(group_container, cells);

                group_container.cache(
                    group_container.$range.min_x,
                    group_container.$range.min_y,
                    group_container.$range.max_x - group_container.$range.min_x,
                    group_container.$range.max_y - group_container.$range.min_y
                );
                group_container.name = name;

            }, this);
            this.add_group_events();
        },

        set_gc_range: function (group_container, cells) {

            var cell = cells[0];

            var min_x = cell.fill_shape.x;
            var min_y = cell.fill_shape.y;
            var max_x = min_x;
            var max_y = min_y;

            _.each(cells, function (cell) {
                group_container.addChild(cell.fill_shape);
                cell.group_container = group_container;
                min_x = Math.min(min_x, cell.fill_shape.x);
                max_x = Math.max(max_x, cell.fill_shape.x);

                min_y = Math.min(min_y, cell.fill_shape.y);
                max_y = Math.max(max_y, cell.fill_shape.y);

            });

            min_x -= cell.hex_size;
            min_y -= cell.hex_size;
            max_y += 2 * cell.hex_size;
            max_x += 2 * cell.hex_size;
            group_container.$range = {
                min_x: min_x,
                max_x: max_x,
                min_y: min_y,
                max_y: max_y
            };
        },

        nearest_cell: function (container, e) {
            // console.log('target: ', e);
            var x, y;
            if (e.hasOwnProperty('stageX')){
                 x = e.stageX;
                 y = e.stageY;
            } else {
                 x = e.offsetX;
                 y = e.offsetY;
            }
            var target = container.globalToLocal(x, y);

            function _d(cell) {
                return   Math.abs(cell.center_x() - target.x) +
                    Math.abs(cell.center_y() - target.y);
            }

            return _.reduce(container.cells, function (out, cell) {
                if (!out) return cell;
                var distance = _d(cell);
                var out_distance = _d(out);
                return distance < out_distance ? cell : out;
            });
        },

        add_group_events: function () {
            var self = this;

            function _group_contains(container, e) {
                var target = container.globalToLocal(e.offsetX, e.offsetY);

                return container.$range.min_x <= target.x && container.$range.max_x >= target.x
                    && container.$range.min_y <= target.y && container.$range.max_y >= target.y;
            }

            function _group_event(name) {

                return function (e) {
                    _.each(self.fill_group_containers, function (container) {
                        if (_group_contains(container, e)) {
                            return container.$event(name, e);
                        } else {
                            return false;
                        }
                    });
                };
            }

            this.events.mousedown = _group_event('mousedown');
            this.events.mouseup = _group_event('mouseup');
            this.events.mousemove = _group_event('mousemove');


        },

        cell_range: function (stage, render_params) {
            var moved = false;
            if (this._last_rp) {
                moved = true;
            }

            var goc = this.outlines_container;
            var gc = this.grid_container;
            var gp = this.grid_params;
            if (moved) { //@TODO: more granular comparison
                goc.removeAllChildren();
                goc.uncache();
                gc.removeAllChildren();
            }
            this._last_rp = render_params;
            var cells = [];
            this.cells = cells;

            var hex_size = this.grid_params.hex_size;
            var top_left_hex = new EASEL_MAP.class.Hex_Cell(0, 0, hex_size);

            var offset = goc.localToGlobal(0, 0);
            var est_row = Math.ceil(offset.y / top_left_hex.row_unit() * -1);
            var est_col = Math.ceil(offset.x / top_left_hex.col_unit() * -1);

            top_left_hex.row = est_row;
            top_left_hex.col = est_col;


            do {
                ++top_left_hex.col
            } while (top_left_hex.global(goc).x <= 0);
            do {
                ++top_left_hex.row
            } while (top_left_hex.global(goc).y <= 0);

            while (top_left_hex.global(goc).x > 0) {
                --top_left_hex.col;
            }
            while (top_left_hex.global(goc).y > 0) {
                --top_left_hex.row;
            }
            --top_left_hex.col;
            --top_left_hex.col;

            var bottom_right_hex = top_left_hex.clone();
            while (bottom_right_hex.global(goc).x < stage.canvas.width) {
                ++bottom_right_hex.col;
            }
            while (bottom_right_hex.global(goc).y < stage.canvas.height) {
                ++bottom_right_hex.row;
            }
            ++bottom_right_hex.row;
            ++bottom_right_hex.col;

            return {
                top_left_hex: top_left_hex,
                bottom_right_hex: bottom_right_hex,
                rows: bottom_right_hex.row - top_left_hex.row + 1,
                cols: bottom_right_hex.col - top_left_hex.col + 1
            }
        },

        render_sublayers: function (render_params) {
            var scale = render_params.scale || 1;
            var gc = this.grid_container;
            gc.scaleX = gc.scaleY = scale;
            var gct = this.grid_container_t;
            gct.x = render_params.left;
            gct.y = render_params.top;


        },

        render: function (stage, render_params) {
           // console.log('rendering hexes');
            render_params = _.defaults(render_params, {scale: 1, left: 0, top: 0});

            this.reset();
            this.render_sublayers(render_params);
            var goc = this.outlines_container;
            var range = this.cell_range(stage);
            var fc = this.fill_container;

            var min_x = this.grid_params.min_x;
            var max_x = this.grid_params.max_x;

            var top_left_hex = range.top_left_hex;
            var bottom_right_hex = range.bottom_right_hex;
            var self = this;
            _.each(_.range(top_left_hex.row, bottom_right_hex.row), function (row) {
                _.each(_.range(top_left_hex.col, bottom_right_hex.col), function (col) {
                    var cell = new EASEL_MAP.class.Hex_Cell(row, col, self.grid_params.hex_size);
                    var x = cell.center_x();
                    if ((x  >= min_x) && (x <= max_x)){
                        cell.render(render_params, fc, self);
                        self.cells.push(cell);
                    }
                })
            });
            var draw_scale = this.cells[0].draw_scale(render_params.scale);

            this.group_cells();

            var tl = goc.globalToLocal(0, 0);
            var wh = goc.globalToLocal(stage.canvas.width, stage.canvas.height);

            // caching outline layer
            if (draw_scale > 1)   goc.cache(
                Math.floor(tl.x),
                Math.floor(tl.y),
                Math.ceil(wh.x - tl.x) + 2,
                Math.ceil(wh.y - tl.y) + 2
                , render_params.scale);
            // fc.cache(Math.floor(tl.x), Math.floor(tl.y), Math.ceil(wh.x - tl.x) + 2, Math.ceil(wh.y - tl.y) + 2);
        }


    }

})(window);;
(function (w) {

    var _default_grid_params = {
        hex_size: 50,
        labels: true,
        label_increment: 6,
        line_color: 'rgb(51,153,255)',
        axis_line_color: 'rgb(255,51,204)',
        heavy_line_color: 'rgb(0,0,102)',
        min_x: -6000,
        max_x: 6000
    };

    EASEL_MAP.hex_layer = function (name, map, params) {
        if (!params) {
            params = {grid_params: {}};
        } else if (!params.grid_params) {
            params.grid_params = {};
        }

        _.defaults(params.grid_params, _default_grid_params);

        var grid_layer = new EASEL_MAP.Layer(name, map, params);

        _.extend(grid_layer, {

            pre_render: function (stage, params) {
                this.reset(stage, params);
            },

            post_render: function (stage, params) {
            }
        });

        _.extend(grid_layer, EASEL_MAP._proto.hex_layer);

        map.add_layer(grid_layer);

        return grid_layer

    };


})(window);;
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