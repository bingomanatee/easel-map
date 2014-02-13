(function () {
    var stage;
    var c = EASEL_MAP.util.init_canvas(500, 300); // document.getElementById('tiny-canvas');

    document.body.appendChild(c);

    stage = new createjs.Stage(c);

    var map = new EASEL_MAP.Map({left: -2000, right: 2000, top: -1000, bottom: 1000});

    var boxes = [];
    var colors = ['red', 'blue', 'green'];
    for (var i = 0; i < 500; ++i) {
        var c = colors[i % colors.length];

        var box = new Box(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 + 1,
            Math.random() * 2000 + 1,
            c);

        boxes.push(box);
    }

    var layer = map.add_layer('boxes', {
        add_tile_shapes: function (tile) {
            for (var i = 0; i < boxes.length; ++i){
                var box = boxes[i];
                if (tile.contains(box.range())){
                    console.log('sprite in tile');
                    var sprite = box.sprite();
                    tile.container().addChild(sprite);
                }
            }
        }
    });


    map.render({left: 25, top: 25, scale: .2}, stage);
    stage.update();
})();