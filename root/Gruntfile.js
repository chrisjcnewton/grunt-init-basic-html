module.exports = function(grunt) {

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    concat : {
      // 2. Configuration for concatinating files goes here.
      distjs : {
        src : ['src/js/**/*.js'],
        dest : 'build/js/<%= pkg.name %>.js',
      }
    },
    uglify : {
      build : {
        src : 'build/js/<%= pkg.name %>.js',
        dest : 'build/js/<%= pkg.name %>.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'build/css/<%= pkg.name %>.css' : 'src/sass/<%= pkg.name %>.scss'
        }
      }
    },

    watch : {
      scripts : {
        files : ['src/js/**/*.js'],
        tasks : ['concat', 'uglify'],
        options : {
          spawn : false,
        }
      },
      sass : {
        files : ['src/sass/**/*.scss'],
        tasks : ['sass'],
        options : {
          spawn : false,
        }
      }
    }

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');



  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

  grunt.registerTask('default', ['concat', 'uglify', 'sass']);


};
