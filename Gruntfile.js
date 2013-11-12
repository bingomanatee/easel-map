module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ";\n"
            },
            dist: {
                src: [
                    'vendor/underscore.1.5.2.min.js',
                    'lib/index.js',
                    'lib/util/grid_extent.js',
                    'lib/map/index.js',
                    'lib/map/render.js',
                    'lib/layer/index.js',
                    'lib/hex/Hex_Cell.js',
                    'lib/hex/render.js',
                    'lib/hex/index.js',
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
                        dest: 'index.js'},
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