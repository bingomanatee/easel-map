# easel-mapper

Easel-mapper is a general purpose canvas based tool to draw maps on a canvas. It uses Adobe's create.js easel library
for lower level canvas rendering.

## Units

Easel-mapper renders data into a canvas, including grids, layered elements (cities, roads, etc.). Its scale, coordinates,
visiblity filters, etc. are not necessarily known on creation; they are parameters passed into the render call.