module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-umd');
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            umd: {
                main: {
                    template: 'unit',
                    src: 'lib/index.js',
                    dest: 'lib/index.umd.js',
                    globalAlias: 'EASEL_MAP',
                    deps: {
                        'default': ['_', 'Canvas', 'Map', 'Stats'],
                        global: ['_', 'Canvas', 'Map', 'Stats'],
                        cjs: ['underscore', 'canvas', './Map', './Stats']
                    },
                    objectToExport: 'EASEL_MAP'
                },

                map: {
                    template: 'unit',
                    src: 'lib/map/index.js',
                    dest: 'build/Map.js',
                    deps: {
                        'default': ['_' ],
                        cjs: ['underscore']
                    },
                    objectToExport: 'Map',
                    globalAlias: 'Map'
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
                }
            },
            concat: {
                all: {
                    files: {
                        'build/easel-map.js': ['lib/index.umd.js'],
                        'build/easel-map.browser.js':
                            [ 'build/underscore.js','build/Map.js', 'build/Stats.js',  'lib/index.umd.js'],
                        'test_modules/public/easel-map.browser.js':
                            [  'build/underscore.js', 'build/Map.js', 'build/Stats.js','lib/index.umd.js']
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['umd:underscore', 'umd:map', 'umd:stats', 'umd:main', 'umd:map', 'concat:all']);
};