/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! Unprinted */'
    },
    sass: {
      dist: {
          options: {
              style: 'compressed'
          },        
          files: { 
            'css/unprinted.min.css' : 'scss/unprinted.scss'
          }
      },
      dev: {
          options: {
              style: 'nested'
          },        
          files: { 
            'css/unprinted.css' : 'scss/unprinted.scss'
          }
      }
    },    
    lint: {
      files: ['grunt.js', 'server.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      dist:{
        files: ['scss/*'],
        tasks: ['sass:dev']
      }      
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  // grunt.registerTask('default', 'lint test concat min');
  grunt.registerTask('default', 'sass');
  grunt.registerTask('launch', 'server watch');

};
