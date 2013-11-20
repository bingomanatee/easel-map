(function(){

    var perlin = new EASEL_MAP.util.Perlin_Canvas(7, 400, 300);

    perlin.render(720, 360);

    $('#perlin').append(perlin.canvas);
    $('#perlin1').append(perlin.bitmaps[0]);
    $('#perlin2').append(perlin.bitmaps[1]);
    $('#perlin3').append(perlin.bitmaps[2]);
    $('#perlin4').append(perlin.bitmaps[3]);

})(window);