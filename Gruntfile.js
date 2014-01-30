module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: "if (typeof module != 'undefined') {\nvar window = module.exports;\nvar _ = require('underscore');}\n(function(window){\n",
                footer: "\n})(window)\n",
                separator: ";\n"
            },
            dist: {
                src: [
                    'lib/index.js',
                    'lib/util/grid_extent.js',
                    'lib/map/index.js',
                    'lib/map/render.js',
                    'lib/map/render_layer.js',
                    'lib/map/refresh.js',
                    'lib/perlin_canvas/index.js',
                    'lib/layer/Layer_Tile.js',
                    'lib/layer/index.js',
                    'lib/hex/draw_hex.js',
                    //'lib/hex/render.js',
                  //  'lib/hex/index.js',
                    'lib/grid/index.js'
                ],
                dest: 'build/easel-mapper.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [
                    {    src: 'build/easel-mapper.js',
                        dest: 'easel-mapper.js'},
                    {
                        src: 'build/easel-mapper.js',
                        dest: 'test-site/public/js/easel-mapper.js'
                    }
                ]

            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};