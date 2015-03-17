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
		pkg: grunt.file.readJSON( "package.json" ),
    // Configuration to be run (and then tested).
    cjsc: {
      main: {
				options: {
					sourceMap: "fixture/*.map",
					sourceMapUrl: "http://localhost/",
					minify: false,
					banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
						"<%= grunt.template.today(\"yyyy-mm-dd\") %> */"
				},
        files: {
          "./fixture/build.js" : "./fixture/main.js"
        }
      },
			config: {
				options: {
					config: {
						"jQuery": {
							"path": "./fixture/config/jquery-stub.js"
						},
						"plugin": {
							"path": "./fixture/config/jquery-plugin-stub.js",
							"require": "jQuery",
							"exports": "jQuery"
						}
					}
				},
        files: {
          "./fixture/config-build.js" : "./fixture/config/main.js"
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
  grunt.registerTask('test', [ 'cjsc:main', 'cjsc:config' ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
