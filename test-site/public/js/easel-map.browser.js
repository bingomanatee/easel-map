
(function(root, factory) {
factory.call(root);
}(this, function() {
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
//# sourceMappingURL=underscore-min.map
}));
/** umd.underscore.hbs */

(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.Stats = factory(req, exp, mod);
    }
}(this, function(require, exports, module) {
/*
 this is a direct lift of fast-stats.

 Note that if your data is too large, there _will_ be overflow.
 */

function asc(a, b) {
    return a - b;
}

var config_params = {
    bucket_precision: function (o, s) {
        if (typeof s != "number" || s <= 0) {
            throw new Error("bucket_precision must be a positive number");
        }
        o._config.bucket_precision = s;
        o.buckets = [];
    },

    buckets: function (o, b) {
        if (!Array.isArray(b) || b.length == 0) {
            throw new Error("buckets must be an array of bucket limits");
        }

        o._config.buckets = b;
        o.buckets = [];
    },

    bucket_extension_interval: function (o, s) {
        if (s === undefined)
            return;
        if (typeof s != "number" || s <= 0) {
            throw new Error("bucket_extension_interval must be a positive number");
        }
        o._config.bucket_extension_interval = s;
    },

    store_data: function (o, s) {
        if (typeof s != "boolean") {
            throw new Error("store_data must be a true or false");
        }
        o._config.store_data = s;
    },

    sampling: function (o, s) {
        if (typeof s != "boolean") {
            throw new Error("sampling must be a true or false");
        }
        o._config.sampling = s;
    }
};

function Stats(c) {
    this._config = { store_data: true };

    if (c) {
        for (var k in config_params) {
            if (c.hasOwnProperty(k)) {
                config_params[k](this, c[k]);
            }
        }
    }

    this.reset();

    return this;
}

Stats.prototype = {

    reset: function () {
        if (this._config.store_data)
            this.data = [];

        this.length = 0;

        this.sum = 0;
        this.sum_of_squares = 0;
        this.sum_of_logs = 0;
        this.sum_of_square_of_logs = 0;
        this.zeroes = 0;
        this.max = this.min = null;

        this._reset_cache();

        return this;
    },

    _reset_cache: function () {
        this._stddev = null;

        if (this._config.store_data)
            this._data_sorted = null;
    },

    _find_bucket: function (a) {
        var b = 0, e, l;
        if (this._config.buckets) {
            l = this._config.buckets.length;
            if (this._config.bucket_extension_interval && a >= this._config.buckets[l - 1]) {
                e = a - this._config.buckets[l - 1];
                b = parseInt(e / this._config.bucket_extension_interval) + l;
                if (this._config.buckets[b] === undefined)
                    this._config.buckets[b] = this._config.buckets[l - 1] + (parseInt(e / this._config.bucket_extension_interval) + 1) * this._config.bucket_extension_interval;
                if (this._config.buckets[b - 1] === undefined)
                    this._config.buckets[b - 1] = this._config.buckets[l - 1] + parseInt(e / this._config.bucket_extension_interval) * this._config.bucket_extension_interval;
            }
            for (; b < l; b++) {
                if (a < this._config.buckets[b]) {
                    break;
                }
            }
        }
        else if (this._config.bucket_precision) {
            b = Math.floor(a / this._config.bucket_precision);
        }

        return b;
    },

    _add_cache: function (a) {
        var tuple = [1], i;
        if (a instanceof Array) {
            tuple = a;
            a = tuple.shift();
        }

        this.sum += a * tuple[0];
        this.sum_of_squares += a * a * tuple[0];
        if (a === 0) {
            this.zeroes++;
        }
        else {
            this.sum_of_logs += Math.log(a) * tuple[0];
            this.sum_of_square_of_logs += Math.pow(Math.log(a), 2) * tuple[0];
        }
        this.length += tuple[0];

        if (tuple[0] > 0) {
            if (this.max === null || this.max < a)
                this.max = a;
            if (this.min === null || this.min > a)
                this.min = a;
        }

        if (this.buckets) {
            var b = this._find_bucket(a);
            if (!this.buckets[b])
                this.buckets[b] = [0];
            this.buckets[b][0] += tuple.shift();

            for (i = 0; i < tuple.length; i++)
                this.buckets[b][i + 1] = (this.buckets[b][i + 1] | 0) + (tuple[i] | 0);
        }

        this._reset_cache();
    },

    _del_cache: function (a) {
        var tuple = [1], i;
        if (a instanceof Array) {
            tuple = a;
            a = tuple.shift();
        }

        this.sum -= a * tuple[0];
        this.sum_of_squares -= a * a * tuple[0];
        if (a === 0) {
            this.zeroes--;
        }
        else {
            this.sum_of_logs -= Math.log(a) * tuple[0];
            this.sum_of_square_of_logs -= Math.pow(Math.log(a), 2) * tuple[0];
        }
        this.length -= tuple[0];

        if (this._config.store_data) {
            if (this.length === 0) {
                this.max = this.min = null;
            }
            if (this.length === 1) {
                this.max = this.min = this.data[0];
            }
            else if (tuple[0] > 0 && (this.max === a || this.min === a)) {
                var i = this.length - 1;
                if (i >= 0) {
                    this.max = this.min = this.data[i--];
                    while (i-- >= 0) {
                        if (this.max < this.data[i])
                            this.max = this.data[i];
                        if (this.min > this.data[i])
                            this.min = this.data[i];
                    }
                }
            }
        }

        if (this.buckets) {
            var b = this._find_bucket(a);
            if (this.buckets[b]) {
                this.buckets[b][0] -= tuple.shift();

                if (this.buckets[b][0] === 0)
                    delete this.buckets[b];
                else
                    for (i = 0; i < tuple.length; i++)
                        this.buckets[b][i + 1] = (this.buckets[b][i + 1] | 0) - (tuple[i] | 0);
            }
        }

        this._reset_cache();
    },

    push: function () {
        var i, a, args = Array.prototype.slice.call(arguments, 0);
        if (args.length && args[0] instanceof Array)
            args = args[0];
        for (i = 0; i < args.length; i++) {
            a = args[i];
            if (this._config.store_data)
                this.data.push(a);
            this._add_cache(a);
        }

        return this;
    },

    push_tuple: function (tuple) {
        if (!this.buckets) {
            throw new Error("push_tuple is only valid when using buckets");
        }
        this._add_cache(tuple);
    },

    pop: function () {
        if (this.length === 0 || this._config.store_data === false)
            return undefined;

        var a = this.data.pop();
        this._del_cache(a);

        return a;
    },

    remove_tuple: function (tuple) {
        if (!this.buckets) {
            throw new Error("remove_tuple is only valid when using buckets");
        }
        this._del_cache(tuple);
    },

    reset_tuples: function (tuple) {
        var b, l, t, ts = tuple.length;
        if (!this.buckets) {
            throw new Error("reset_tuple is only valid when using buckets");
        }

        for (b = 0, l = this.buckets.length; b < l; b++) {
            if (!this.buckets[b] || this.buckets[b].length <= 1) {
                continue;
            }
            for (t = 0; t < ts; t++) {
                if (typeof tuple[t] !== 'undefined') {
                    this.buckets[b][t] = tuple[t];
                }
            }
        }
    },

    unshift: function () {
        var i, a, args = Array.prototype.slice.call(arguments, 0);
        if (args.length && args[0] instanceof Array)
            args = args[0];
        i = args.length;
        while (i--) {
            a = args[i];
            if (this._config.store_data)
                this.data.unshift(a);
            this._add_cache(a);
        }

        return this;
    },

    shift: function () {
        if (this.length === 0 || this._config.store_data === false)
            return undefined;

        var a = this.data.shift();
        this._del_cache(a);

        return a;
    },

    amean: function () {
        if (this.length === 0)
            return NaN;
        return this.sum / this.length;
    },

    gmean: function () {
        if (this.length === 0)
            return NaN;
        if (this.zeroes > 0)
            return NaN;
        return Math.exp(this.sum_of_logs / this.length);
    },

    stddev: function () {
        if (this.length === 0)
            return NaN;
        var n = this.length;
        if (this._config.sampling)
            n--;
        if (this._stddev === null)
            this._stddev = Math.sqrt((this.length * this.sum_of_squares - this.sum * this.sum) / (this.length * n));

        return this._stddev;
    },

    gstddev: function () {
        if (this.length === 0)
            return NaN;
        if (this.zeroes > 0)
            return NaN;
        var n = this.length;
        if (this._config.sampling)
            n--;
        return Math.exp(Math.sqrt((this.length * this.sum_of_square_of_logs - this.sum_of_logs * this.sum_of_logs) / (this.length * n)));
    },

    moe: function () {
        if (this.length === 0)
            return NaN;
        // see http://en.wikipedia.org/wiki/Standard_error_%28statistics%29
        return 1.96 * this.stddev() / Math.sqrt(this.length);
    },

    range: function () {
        if (this.length === 0)
            return [NaN, NaN];
        return [this.min, this.max];
    },

    distribution: function () {
        if (this.length === 0)
            return [];
        if (!this.buckets)
            throw new Error("bucket_precision or buckets not configured.");

        var d = [], i, j, k, l;

        if (this._config.buckets) {
            j = this.min;
            l = Math.min(this.buckets.length, this._config.buckets.length);

            for (i = 0; i < l; j = this._config.buckets[i++]) {	// this has to be i++ and not ++i
                if (this._config.buckets[i] === undefined && this._config.bucket_extension_interval)
                    this._config.buckets[i] = this._config.buckets[i - 1] + this._config.bucket_extension_interval;
                if (this.min > this._config.buckets[i])
                    continue;

                d[i] = {
                    bucket: (j + this._config.buckets[i]) / 2,
                    range: [j, this._config.buckets[i]],
                    count: (this.buckets[i] ? this.buckets[i][0] : 0),
                    tuple: this.buckets[i] ? this.buckets[i].slice(1) : []
                };

                if (this.max < this._config.buckets[i])
                    break;
            }
            if (i == l && this.buckets[i]) {
                d[i] = {
                    bucket: (j + this.max) / 2,
                    range: [j, this.max],
                    count: this.buckets[i][0],
                    tuple: this.buckets[i] ? this.buckets[i].slice(1) : []
                };
            }
        }
        else if (this._config.bucket_precision) {
            i = Math.floor(this.min / this._config.bucket_precision);
            l = Math.floor(this.max / this._config.bucket_precision) + 1;
            for (j = 0; i < l && i < this.buckets.length; i++, j++) {
                if (!this.buckets[i]) {
                    continue;
                }
                d[j] = {
                    bucket: (i + 0.5) * this._config.bucket_precision,
                    range: [i * this._config.bucket_precision, (i + 1) * this._config.bucket_precision],
                    count: this.buckets[i][0],
                    tuple: this.buckets[i] ? this.buckets[i].slice(1) : []
                };
            }
        }

        return d;

    },

    percentile: function (p) {
        if (this.length === 0 || (!this._config.store_data && !this.buckets))
            return NaN;

        // If we come here, we either have sorted data or sorted buckets

        var v;

        if (p <= 0)
            v = 0;
        else if (p == 25)
            v = [Math.floor((this.length - 1) * 0.25), Math.ceil((this.length - 1) * 0.25)];
        else if (p == 50)
            v = [Math.floor((this.length - 1) * 0.5), Math.ceil((this.length - 1) * 0.5)];
        else if (p == 75)
            v = [Math.floor((this.length - 1) * 0.75), Math.ceil((this.length - 1) * 0.75)];
        else if (p >= 100)
            v = this.length - 1;
        else
            v = Math.floor(this.length * p / 100);

        if (v === 0)
            return this.min;
        if (v === this.length - 1)
            return this.max;

        if (this._config.store_data) {
            if (this._data_sorted === null)
                this._data_sorted = this.data.slice(0).sort(asc);

            if (typeof v == 'number')
                return this._data_sorted[v];
            else
                return (this._data_sorted[v[0]] + this._data_sorted[v[1]]) / 2;
        }
        else {
            var j;
            if (typeof v != 'number')
                v = (v[0] + v[1]) / 2;

            if (this._config.buckets)
                j = 0;
            else if (this._config.bucket_precision)
                j = Math.floor(this.min / this._config.bucket_precision);

            for (; j < this.buckets.length; j++) {
                if (!this.buckets[j])
                    continue;
                if (v <= this.buckets[j][0]) {
                    break;
                }
                v -= this.buckets[j][0];
            }

            return this._get_nth_in_bucket(v, j);
        }
    },

    _get_nth_in_bucket: function (n, b) {
        var range = [];
        if (this._config.buckets) {
            range[0] = (b > 0 ? this._config.buckets[b - 1] : this.min);
            range[1] = (b < this._config.buckets.length ? this._config.buckets[b] : this.max);
        }
        else if (this._config.bucket_precision) {
            range[0] = Math.max(b * this._config.bucket_precision, this.min);
            range[1] = Math.min((b + 1) * this._config.bucket_precision, this.max);
        }
        return range[0] + (range[1] - range[0]) * n / this.buckets[b][0];
    },

    median: function () {
        return this.percentile(50);
    },

    iqr: function () {
        var q1, q3, fw;

        q1 = this.percentile(25);
        q3 = this.percentile(75);

        fw = (q3 - q1) * 1.5;

        return this.band_pass(q1 - fw, q3 + fw, true);
    },

    band_pass: function (low, high, open, config) {
        var i, j, b, b_val, i_val;

        if (!config)
            config = this._config;

        b = new Stats(config);

        if (this.length === 0)
            return b;

        if (this._config.store_data) {
            if (this._data_sorted === null)
                this._data_sorted = this.data.slice(0).sort(asc);

            for (i = 0; i < this.length && (this._data_sorted[i] < high || (!open && this._data_sorted[i] === high)); i++) {
                if (this._data_sorted[i] > low || (!open && this._data_sorted[i] === low)) {
                    b.push(this._data_sorted[i]);
                }
            }
        }
        else if (this._config.buckets) {
            for (i = 0; i <= this._config.buckets.length; i++) {
                if (this._config.buckets[i] < this.min)
                    continue;

                b_val = (i == 0 ? this.min : this._config.buckets[i - 1]);
                if (b_val < this.min)
                    b_val = this.min;
                if (b_val > this.max)
                    b_val = this.max;

                if (high < b_val || (open && high === b_val)) {
                    break;
                }
                if (low < b_val || (!open && low === b_val)) {
                    for (j = 0; j < (this.buckets[i] ? this.buckets[i][0] : 0); j++) {
                        i_val = Stats.prototype._get_nth_in_bucket.call(this, j, i);
                        if ((i_val > low || (!open && i_val === low))
                            && (i_val < high || (!open && i_val === high))
                            ) {
                            b.push(i_val);
                        }
                    }
                }
            }

            b.min = Math.max(low, b.min);
            b.max = Math.min(high, b.max);
        }
        else if (this._config.bucket_precision) {
            var low_i = Math.floor(low / this._config.bucket_precision),
                high_i = Math.floor(high / this._config.bucket_precision) + 1;

            for (i = low_i; i < Math.min(this.buckets.length, high_i); i++) {
                for (j = 0; j < (this.buckets[i] ? this.buckets[i][0] : 0); j++) {
                    i_val = Stats.prototype._get_nth_in_bucket.call(this, j, i);
                    if ((i_val > low || (!open && i_val === low))
                        && (i_val < high || (!open && i_val === high))
                        ) {
                        b.push(i_val);
                    }
                }
            }

            b.min = Math.max(low, b.min);
            b.max = Math.min(high, b.max);
        }

        return b;
    },

    copy: function (config) {
        var b = Stats.prototype.band_pass.call(this, this.min, this.max, false, config);

        b.sum = this.sum;
        b.sum_of_squares = this.sum_of_squares;
        b.sum_of_logs = this.sum_of_logs;
        b.sum_of_square_of_logs = this.sum_of_square_of_logs;
        b.zeroes = this.zeroes;

        return b;
    },

    epsilon: function () {
        return this.sum;
    },

    pie: function () {
        return this.zeroes > 0 ? 0 : Math.exp(this.sum_of_logs);
    }
};

Stats.prototype.epsilon = Stats.prototype.stddev;
Stats.prototype.average = Stats.prototype.amean;

    return Stats;
}));


(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('canvas'), require('./Stats'), require('node-easel'), require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['_', 'Canvas', 'Stats', 'createjs', 'require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.EASEL_MAP = factory(root._, root.Canvas, root.Stats, root.createjs, req, exp, mod);
    }
}(this, function(_, Canvas, Stats, createjs, require, exports, module) {
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
    }
};

EASEL_MAP.util.init_canvas =  function init_canvas(width, height){
    if (typeof document != 'undefined'){
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
    } else {
        canvas = new Canvas(width, height);
    }

    return canvas;
}
var _defaults = {
    top: -3250,
    bottom: 3250,
    left: -6500,
    right: 6500
};

function Map(params) {
    this.init();
    _.defaults(this, _defaults);
    _.extend(this, params);

};

Map.prototype = {

    height: function () {
        return this.bottom - this.top;
    },

    width: function () {
        return this.right - this.left;
    },

    init: function () {
        this.paths = [];
        this.regions = [];
        this.spots = [];
        this.units = 'm';
        this.layers = {};
    },

    render: function (params, stage, canvas) {

        if (!stage) {
            if (!canvas) throw new Error("must provide stage or canvas to render");
            stage = new createjs.Stage(canvas);
        }

        var layers = this.get_layers();

        _.each(layers, function (layer) {
            layer.set_coordinates(stage, params);
        }, this);

        _.each(layers, function (layer) {
            if (layer.pre_render) {
                layer.pre_render(stage, params);
            } else {
            }
        }, this);

        _.each(layers, function (layer) {
            layer.render(stage, params);
        });

        _.each(layers, function (layer) {
            if (layer.post_render) {
                layer.post_render(stage, params);
            }

            if (!layer.events_updated) {
                layer.update_events();
                layer.events_updated = true;
            }
        }, this);
        stage.update();
        return stage;
    },

    render_layer: function (layer, params, stage) {

        if (_.isString(layer)) {
            layer = this.layers[layer];
        }

        if (!layer) {
            throw new Error('cannot get layer ' + layer);
        }

        if (params) {
            layer.set_coordinates(stage, params);
        }

        if (layer.pre_render) {
            console.log('rendering prerender for ', layer.name);
            layer.pre_render(stage, params);
        } else {
            console.log('no prerender for ', layer.name);
        }

        layer.render(stage, params);

        if (!layer.events_updated) {
            layer.update_events();
            layer.events_updated = true;
        }

        stage.update();
        return stage;
    },

    refresh: function (layer_names) {

        _.each(this.layers, function (layer) {
            if (!layer_names || _.contains(layer_names, layer.name)) {
                layer.refresh();
            }
        })
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
                throw new Error('already have a layer ' + layer);
            }
            layer = this.layers[layer] = new Layer(layer, this, params || {});
        } else if (this.layers[layer.name]) {
            throw new Error('already have a layer ', layer.name);
        } else {
            this.layers[layer.name] = layer;
        }

        return layer;

    },

    set_coordinates: function (params, stage) {
        _.each(this.get_layers(), function (layer) {
            layer.set_coordinates(stage, params);
        }, this);
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

EASEL_MAP.Map = Map;
var DEBUG_TILES = false;
var DEFAULT_TILE_SIZE = 200;

Layer = function Layer(name, map, params) {
    if (!_.isString(name)) {
        throw new Error('name must be string');
    }
    this.name = name;
    this.map = map;
    this.tile_width = this.tile_height = DEFAULT_TILE_SIZE;
    this.events = {};
    this.tiles = [];
    _.extend(this, params);
    this.order = map.layers.length;
    this.name = name;
};

Layer.prototype = {

    set_coordinates: function (stage, params) {
        if (stage) {
            this.set_stage(stage);
        }
        if (params.hasOwnProperty('left')) {
            this.offset_layer().x = this.left(params.left);
        }
        if (params.hasOwnProperty('top')) {
            this.offset_layer().y = this.top(params.top);
        }
        if (params.hasOwnProperty('scale')) {
            var gc = this.scale_layer();
            gc.scaleX = gc.scaleY = this.scale(params.scale);
        }
    },
    render: function (stage) {
        this.set_stage(stage);
        var tiles = this.retile();

        _.each(tiles, function (tile) {
            //  console.log('scale for ', tile.i, tile.j, 'is', tile.loaded_scale, 'against', this.scale());
            if (tile.loaded_scale != this.scale()) {
                tile.load();
            } else {
                //     console.log('not redrawing ', tile.i, tile.j);
            }
        }, this);
    },

    cache: function (stage) {
        //  console.log('caching layer', this);
        if (this.container.x || this.container.y || this.container.scaleX != 1 || this.container.scaleY != 1) {
            throw new Error('cannot cache offset/scaled containers');
        }
        this.container.cache(0, 0, stage.canvas.width, stage.canvas.height);
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

    update_events: function () {
        _.each(this.events, function (handler, name) {
            this.offset_layer().removeAllEventListeners(name);
            this.offset_layer().on(name, handler);
        }, this);
    },

    scale: function (s) {
        if (arguments.length > 0) {
            this._scale = s;
        }
        return this._scale;
    },

    left: function (s) {
        if (arguments.length > 0) {
            this._left = s;
        }
        return this._left;
    },

    top: function (s) {
        if (arguments.length > 0) {
            this._top = s;
        }
        return this._top;
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
            return this.events[name](e);
        } else {
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

        //   ltl.x = Math.max(this.map.left, ltl.x);
        //    ltl.y = Math.max(this.map.top, ltl.y);

        tl.move_around(ltl.x, ltl.y);

        var br = this.tile(tl.i, tl.j);
        var lbr = this.local_br();

        //  lbr.x = Math.min(this.map.right,lbr.x);
        //   lbr.y = Math.min(this.map.bottom, lbr.y);

        br.move_around(lbr.x, lbr.y);

        return {tl: _.pick(tl, 'i', 'j'), br: _.pick(br, 'i', 'j')};
    },

    tile: function (x, y) {
        return new EASEL_MAP.Tile(this, x, y);
    },

    add_tile_shapes: function (tile) {
        throw new Error('must be overridden by layer definition')
    },

    refresh: function () {
        _.each(this.tiles, function (tile) {
            tile.refresh();
            tile.load();
        }, this);
    },

    retile: function () {
        // return;
        var tr = this.tile_range();
        //    console.log('tile range:', JSON.stringify(tr));

        var left = tr.tl.i;
        var right = tr.br.i;
        var top = tr.tl.j;
        var bottom = tr.br.j;

        function _in_range(tile) {
            return tile.i >= left &&
                tile.i <= right &&
                tile.j >= top &&
                tile.j <= bottom;
        }

        console.log('looking for old tiles in', this.tiles.length, 'old tiles');

        var old_tiles = this.tiles.filter(_in_range);
        var removed_tiles = _.reject(this.tiles, _in_range);

        _.each(removed_tiles, function (tile) {
            tile.container().removeAllChildren();
            if (tile.container().parent) {
                tile.container().parent.removeChild(tile.container());
            }
        }, this);

        _.each(_.range(left, right + 1), function (i) {
            _.each(_.range(top, bottom + 1), function (j) {
                var old_tile = _.find(old_tiles, function (tile) {
                    return tile.i == i && tile.j == j;
                });
                if (!old_tile) {
                    var tile = this.tile(i, j);

                    this.tiles.push(tile);
                    old_tiles.push(tile);
                }
            }, this);
        }, this);

        // forgetting tiles that are out of the screen

        this.tiles = old_tiles;
        return this.tiles;
    },

    bounds: function () {

        var top_left = this.offset_layer().globalToLocal(0, 0);

        var bottom_right = this.offset_layer().globalToLocal(this.stage.canvas.width, this.stage.canvas.height);

        var out = {
            top: top_left.y,
            left: top_left.x,
            bottom: bottom_right.y,
            right: bottom_right.x
        };

        out.width = out.right - out.left;
        out.height = out.bottom - out.top;
        return out;
    }

};

EASEL_MAP.Layer = Layer;
/**
 * The layer tile is a region of the map.
 * The map is broken into smaller regions to increase the utility of caching,
 * reduce the overhead of mouse click tracking, and because Google does it.
 *
 * No matter what the map scale is tiles always take up the same amount of
 * visual space. that is, if you zoom in, a given tile will have four times
 * as much stuff on it.
 *
 * @param layer {EASEL_MAP.Layer}
 * @param i {int} the column/x index
 * @param j {int} the row/y index
 *
 * @constructor
 */
function Tile(layer, i, j) {
    this.layer = layer;

    this.i = i;
    this.j = j;
    this.loaded = false;
}

Tile.prototype = {

    /**
     * This is the main "draw" routine of the tile.
     * It presumes the tiles have been created.
     * it calls the local add_tile_shapes to load custom content
     *
     */
    load: function () {
        this.container().removeAllChildren();
        var scale = this.layer.scale();

        this.layer.add_tile_shapes(this);
        this.cache(scale);
        this.loaded_scale = scale;

        this.loaded = true;
    },

    refresh: function () {
        this.container().uncache();
        this.container().removeAllChildren();
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
        var left = Math.floor(this.left() - 1);
        var top = Math.floor(this.top() - 1);
        var width = Math.ceil(this.layer.tile_width / scale + 2);

        // console.log('caching', left, top, width, 'at scale', scale);

        if ((this.container().cacheLayer) && this.loaded_scale == scale) {
            this.container().updateCache();
        } else {
            this.container().cache(
                left,
                top,
                width,
                width,
                scale
            );
        }
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
        return this.layer.tile_width / this.layer.scale();
    },

    height: function () {
        return this.layer.tile_height / this.layer.scale();
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
        if (this.bottom() <= range.top) {
            console.log('bottom', this.bottom(), '<= range.top', range.top);
            return false;
        }
        return true;
    }

};

EASEL_MAP.Tile = Tile;
    return EASEL_MAP;
}));
