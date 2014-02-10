module.foo = 2;
var assert = require('assert');

(function(root){

    exports.bar = 3;
    assert.equal(root.bar, 3, 'exports == window');
})(this);