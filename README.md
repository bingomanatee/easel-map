# easel-mapper

Easel-mapper is a general purpose canvas based tool to draw tiled maps on a canvas. It uses Adobe's create.js easel
library for lower level canvas rendering.

# context and dependencies

Easel-mapper is designed to run in the browser primarily. It requires the create.js and underscore to be present.
Easel-mapper will execute in the node context 

## Layers

Each map has one or more drawing layers. These layers are classes in the map; they have a name, and a self-named
container, in the map's canvas. Also, each layer has their own tiles that are independantly cached and redrawn

Layers should be instantiated individually and added through `map.addLayer(myLayer)`.

Each layer has an order property based on the order of creation; add the bottom layers first, then the top layers.
If for some reason you need to change the order of the layers, change their order properties (which are set on creation).
note you will also have to change *the order of the containers* manually if that is something you want to have happen.

## Rendering

Each layer has a colletion of render tiles; they are dynamically added and removed as the map is navigated.
The map is repositioned by passing a new set of coordinate parameters to map.render; `top`, `left`, and `scale`.

note each call to render accepts both a parameter set and a stage; this allows you to render to multiple canvases
with their own positioning if desired from the same map class. This won't necessarily be as efficient as the cached
tiles won't necessarily be reusable across multiple maps.

``` javascript

        $('#down').click(function () {
            render_params.top -= D / render_params.scale;
            // moving the same number of pixels regardless of scale
            map.render(render_params, stage);
            stat();
        });

        $('#zoom_in').click(function () {

            if (render_params.scale < 2) {

                render_params.scale *= 2;
                map.render(render_params, stage);
            }
            stat();
        });

```

Rendering executes the following steps.

1. loads the scale, top, left into the layer properties of the same name
2. *if there is a layer.pre_render*, calls layer.pre_render(stage, params)
3. calls layer.render(stage, params)
4. *if there is a layer.post_render* calls layer.post_render(stage, params)

### Rendering shapes into a tile

Render resets the layer's tiles to those that are currently visible, culling the others.
It then calls the layer's `add_tile_shapes(tile)` method for each new tile, allowing you
to draw shapes into the tile's `container()`. *This method must be customized* for each layer
to allow it to draw whatever content you want it to have.

### Refreshing tile content

the map drawing routine assumes that the shapes do not change in a given layer.
* To refresh a layer to reflect changed content call `layer.refresh();`
* To refresh an individual layer tile, call `tile.refresh()`;
* to refresh all layers, call `map.refresh()`;

These commands will clear the cache of the tile and call `add_tile_shapes(tile)` on it.
you will have to call `stage.update()` manually yourself after a refresh.

