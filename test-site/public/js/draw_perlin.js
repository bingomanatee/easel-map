(function(){

    var perlin = new EASEL_MAP.util.Perlin_Canvas(2);

    perlin.render(400, 200);

    $('#perlin').append(perlin.canvas);
    $('#perlin1').append(perlin.bitmaps[0]);
    $('#perlin2').append(perlin.bitmaps[1]);
    $('#perlin3').append(perlin.bitmaps[2]);
    $('#perlin4').append(perlin.bitmaps[3]);

})(window);