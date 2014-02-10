
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