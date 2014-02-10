(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    }
    else if(typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        root['foo'] = factory();
    }
}(this, function() {
function foo(a) {
    return 2 * a;
};
    return foo;
}));
