(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('node-canvas'));
    }
    else if(typeof define === 'function' && define.amd) {
        define(['Canvas'], factory);
    }
    else {
        root['init_canvas'] = factory(root.Canvas);
    }
}(this, function(Canvas) {

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
    return init_canvas;
}));
