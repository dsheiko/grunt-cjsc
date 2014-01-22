/*
 * grunt-cjsc
 * https://github.com/dsheiko/grunt-cjsc
 *
 * Copyright (c) 2013 Dmitry Sheiko
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function( grunt ) {

  // Project configuration.

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["tasks/**/*.js"]
    },
    // Configuration to be run (and then tested).
    cjsc: {
      development: {
        files: {
          "./fixture/dest.js" : "./fixture/main.js"
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['cjsc']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
