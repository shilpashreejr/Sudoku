module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {

      options: {
        // Task-specific options go here.
      },

      // prefix the specified file
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: 'src/css/file.css',
        dest: 'dest/css/file.css'
      },

      diff: {
        options: {
          diff: true
        },
        src: 'src/css/file.css',
        dest: 'dest/css/file.css' // -> dest/css/file.css, dest/css/file.css.patch
      },

      sourcemap: {
        options: {
          map: true
        },
        src: 'src/css/file.css',
        dest: 'dest/css/file.css' // -> dest/css/file.css, dest/css/file.css.map
      },
    },
    uglify: {
      my_target: {
        files: {
          'dest/js/output.min.js': ['src/js/input1.js', 'src/js/input2.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['autoprefixer', 'uglify']);
};