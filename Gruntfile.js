module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-umd');
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            umd: {
                main: {
                    template: 'unit',
                    src: 'build/index.js',
                    dest: 'build/index.umd.js',
                    globalAlias: 'EASEL_MAP',
                    deps: {
                        'default': ['_', 'Canvas','Stats', 'createjs'],
                        cjs: ['underscore', 'canvas', './Stats', 'node-easel']
                    },
                    objectToExport: 'EASEL_MAP'
                },
/*
                map: {
                    template: 'unit',
                    src: 'lib/map/index.js',
                    dest: 'build/Map.js',
                    deps: {
                        'default': ['_', 'createjs' ],
                        cjs: ['underscore', 'node-easel']
                    },
                    objectToExport: 'Map',
                    globalAlias: 'EASEL_MAP.Map'
                },

                layer: {
                    template: 'unit',
                    src: 'lib/layer/index.js',
                    dest: 'build/Layer.js',
                    deps: {
                        'default': ['_', 'createjs' ],
                        cjs: ['underscore', 'node-easel']
                    },
                    objectToExport: 'Layer',
                    globalAlias: 'Layer'
                },

                tile: {
                    template: 'unit',
                    src: 'lib/tile/index.js',
                    dest: 'build/Tile.js',
                    deps: {
                        'default': ['_', 'createjs' ],
                        cjs: ['underscore', 'node-easel']
                    },
                    objectToExport: 'Tile',
                    globalAlias: 'Tile'
                },*/

                init_canvas: {
                  templates: 'unit',
                    src: 'lib/util/init_canvas.js',
                    dest: 'build/init_canvas.js',
                    globalAlias: 'init_canvas',
                    deps: {
                        'default': ['Canvas'],
                        cjs: ['node-canvas']
                    },
                    objectToExport: 'init_canvas'
                },
                stats: {
                    template: 'unit',
                    src: 'lib/vendor/Stats.js',
                    dest: 'build/Stats.js',
                    objectToExport: 'Stats',
                    globalAlias: 'Stats'
                },

                underscore: {
                    template: __dirname + '/lib/umd.underscore.hbs',
                    src: 'lib/vendor/underscore.1.5.2.min.js',
                    dest: 'build/underscore.js'
                },

                create: {
                    template: __dirname + '/lib/umd.underscore.hbs',
                    src: 'lib/vendor/create.js',
                    dest: 'build/create.js'
                }
            },
            concat: {
                all: {
                    files: {
                        'test_site/public/js/canvas.browser.js': ['build/init_canvas.js', 'build/create.js'],
                        'easel-map.js': ['build/index.umd.js'],
                        'easel-map.browser.js': [ 'build/underscore.js', 'build/Stats.js', 'build/index.umd.js'],
                        'test-site/public/js/easel-map.browser.js': [  'build/underscore.js', 'build/Stats.js', 'build/index.umd.js']
                    }
                },
                easelmap: {
                    files: {
                        'build/index.js': ['lib/index.js', 'lib/util/init_canvas.js', 'lib/map/index.js', 'lib/layer/index.js', 'lib/tile/index.js']
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['umd:underscore', 'umd:create', 'umd:init_canvas', 'umd:stats',  'concat:easelmap', 'umd:main',  'concat:all']);
};