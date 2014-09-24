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
        src: 'src/css/sudoku.css',
        dest: 'dest/css/sudoku.css'
      },

      diff: {
        options: {
          diff: true
        },
        src: 'src/css/sudoku.css',
        dest: 'dest/css/sudoku.css'
      },

      sourcemap: {
        options: {
          map: true
        },
        src: 'src/css/sudoku.css',
        dest: 'dest/css/sudoku.css'
      },
    },
    uglify: {
      my_target: {
        files: {
          'dest/js/sudoku.min.js': ['src/js/sudokuView.js', 'src/js/sudokuController.js', 'src/js/sudokuModel.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['autoprefixer', 'uglify']);
};