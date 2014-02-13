# easel-mapper

Easel-mapper is a general purpose canvas based tool to draw tiled maps on a canvas. It uses Adobe's create.js easel
library for lower level canvas rendering.

easel-mapper works on the node.js server and on the browser client; this means you can render tiles on the client
and serve them as image data, and/or design maps on the client and render them flat on the server.

easel-mapper is desinged to work with large, complex shapes, with interaction and live editing, at multiple scales.

# context and dependencies

Easel-mapper on the browser requires the create.js and underscore to be present.

## Layers

Each map has one or more drawing layers. These layers are classes in the map; they have a name, and a self-named
container, in the map's canvas. Also, each layer has their own tiles that are independently cached and redrawn.

Layers should be instantiated individually and added through `map.addLayer(myLayer)`.

Each layer has an order property based on the order of creation; add the bottom layers first, then the top layers.
If for some reason you need to change the order of the layers, change their order properties (which are set on creation).
note you will also have to change *the order of the containers* manually if that is something you want to have happen.

## Rendering

There are two ways to render layers.

1) the default -- layers will generate tiles for regions of the display area, that are cached and redrawn as needed.
2) manual -- define your own render method for the layer, and add shapes as needed to the `offset` container.

The first method is best for layers with a lot of small shapes; the second is better for regions with larger crossing
shapes like gridlines.

In either case, you will want to call map.render(render_params, stage) whenever the content or position of the map changes.

render_params is an object with three properties: `top`, `left`, and `scale`.

* Scale is any positive number;
* top and left are any float values.

``` javascript

var D = 100;

    $('#down').click(function () {
        render_params.top -= D / render_params.scale;
        // moving the same number of pixels regardless of scale
        map.render(render_params, stage);
        stage.update();
    });

    $('#zoom_in').click(function () {

        if (render_params.scale < 2) {
            render_params.scale *= 2;
            map.render(render_params, stage);
        }
        stage.update();
    });

```

Rendering executes the following steps.

1. loads the scale, top, left into the layer properties of the same name
2. *if there is a layer.pre_render*, calls layer.pre_render(stage, params)
3. calls layer.render(stage, params)
4. *if there is a layer.post_render* calls layer.post_render(stage, params)

### Rendering shapes into a tile

Each layer has several tiles in which content is rendered. This is analogous to Google Map's
tiled images. Tiles are cached, added, and deleted as necessary to draw the current view range.

Render resets the layer's tiles to those that are currently visible, culling the others.
It then calls the layer's `add_tile_shapes(tile)` method for each new tile, allowing you
to draw shapes into the tile's `container()`. *This method must be customized* for each layer
to allow it to draw whatever content you want it to have.

In order to test whether a given shape is in the visible region of a tile,
call `tile.contains({left: n, right: o, top: m, bottom: p})`.
(You will have to derive those values yourself from your shape style.)
When in doubt, calculate a reasonable radius for the shape
and offset the x and y properties of the shape by that radius, taking shape scale into account.

### Refreshing tile content

the map drawing routine assumes that the shapes do not change in a given layer.
* To refresh a layer to reflect changed content call `layer.refresh();`
* To refresh an individual layer tile, call `tile.refresh()`;
* to refresh all layers, call `map.refresh()`;

These commands will clear the cache of the tile and call `add_tile_shapes(tile)` on it.
you will have to call `stage.update()` manually yourself after a refresh.

# Complete Example

All together the process looks like this:

``` javascript

    function Box(x, y, w, h, c){

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.color = c;
    }

    Box.prototype = {

        range: function (){
            return {
                left: this.x,
                right: this.x + this.width,
                top: this.y,
                bottom: this.y + this.height
            };
        },

        sprite: function(){
            var shape = new createjs.Shape();
            shape.graphics.f(this.color).dr(0, 0, this.width, this.height).ef();

            shape.x = this.x;
            shape.y = this.y;

            return shape;
        }

    };

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

```

## Some guidelines for layer creation and management

If you want to create content that is largely immobile - backgrounds, etc. -- extend the
render_tile(tile) method of a layer and attach shapes to the container() method of the tile.

Note that shapes may need to be created in multiple tiles, so you must spawn unique shapes for each tile.

Tiles are great for caching draw content that is not moving; however for interactive layers,
where sprites are created/move/animate, you will want to create your own containers.

The "render" method of the layer is where tiles are created. If you DO NOT want tiles
in a layer, override that method with your own render method.

To create events that react on click/move at the tile level, attach events to the layer's `events` property.

to animate the changing position/scale of a map, call `map.render(render_params, stage);
render_params has top, left, and scale properties. This may or may not create new tiles as needed.

To force a layer's tiles to be redrawn, call `layer.refresh()`; or call `map.refresh()` to refresh all tiles.
follow any refresh call by a map.render() or `map.render_layer(layer, render_params)`;
