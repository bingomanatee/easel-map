# easel-mapper

Easel-mapper is a general purpose canvas based tool to draw maps on a canvas. It uses Adobe's create.js easel library
for lower level canvas rendering.

## Units

Easel-mapper renders data into a canvas, including grids, layered elements (cities, roads, etc.). Its scale, coordinates,
visibility filters, etc. are not necessarily known on creation; they are parameters passed into the render call.

## Layers

Each map has one or more drawing layers. These layers are classes in the map; they have a name, and a self-named
container, in the map's canvas.

Layers should be instantiated individually and added through `map.addLayer(myLayer)`.

As an optimization step. each layer container can be cached. To prevent extremely huge caches,
cache the layer container itself and scale or otherwise manipulate sub-containers.

Each layer has an order property based on the order of creation; add the bottom layers first, then the top layers.
If for some reason you need to change the order of the layers, change their order properties (which are set on creation).
note you will also have to change *the order of the containers* manually if that is something you want to have happen.

## Rendering

Each layer has an abstract render function; what it does is up to the nature of that layer. It should only do actions on
the layer that bears its name. The ensure_layer call of render will Ensure that the layer has been created;

Rendering executes the following steps.

1. ensures tha that there is a *container* in the map named after the layer
2. *if there is a layer.pre_render*, calls layer.pre_render(stage, params);
3. calls layer.render(stage, params);
4. *if there is a layer.post_render* calls layer.post_render(stage, params);

Note that the params are offset and scale.

``` javascript

    var render_params = {scale: 0.5, left: -200, top: -100, heavy_freq: 6};

```

Render params may be particular to a given layer, but scale, left and top are universal.

## Caching

Just because render is called doesn't mean you have to recalculate a canvas. Grids, for instance may not need to be redrawn
if the coordinate system has not changed.

If you are going to cache, its best to cache the parent container (the one named after the layer) and put all
the drawing sprites in a layer that you scale, offet, etc. as a child of the container. That way you don't inadvertantly
create a huge cache due to scaling conditions.

Layer.cache() will automatically snapshot the layer container. It is assumed that the parent container has NOT been
scaled or offset.
