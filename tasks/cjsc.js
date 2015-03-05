/*
 * grunt-jscs
 * https://github.com/dsheiko/grunt-jscs
 *
 * Copyright (c) 2013 Dmitry Sheiko
 * Licensed under the MIT license.
 * @jscs standard:Jquery
 */

'use strict';

var exec = require( "child_process" ).exec;

module.exports = function( grunt ) {

    var compileJsic = function( srcFile, destFile, config ) {
					var cjsc = require( "cjsc" ),
              args = {
                targets: [ srcFile, destFile ],
                options: {
                },
                plugins: []
              };


					if ( config.sourceMap ) {
            args.options[ "source-map" ] = config.sourceMap;
					}
					if ( config.sourceMapUrl ) {
            args.options[ "source-map-url" ] = config.sourceMapUrl;
					}
					if ( config.sourceMapRoot ) {
            args.options[ "source-map-root" ] = config.sourceMapRoot;
					}

					if ( config.minify ) {
            args.options.minify = config.minify;
					}
					if ( config.banner ) {
            args.options.banner = config.banner;
					}

          if ( config.plugins ) {
            args.plugins = config.plugins;
					}

          if ( config.debug ) {
            args.options.debug = config.debug;
					}

					grunt.log.writeln('File ' + destFile.cyan + ' created.');
					grunt.verbose.writeln( 'Exec: cjsc ' + srcFile + ' -o ' + destFile );

					cjsc( args, config.config || {} );
			};


    grunt.registerMultiTask( 'cjsc', 'Run cjsc', function() {
			var defaults = {
						minify: false
					},
					config = this.options( defaults ) ;

      if ( this.files.length < 1 ) {
        grunt.verbose.warn('Destination not written because no source files were provided.');
      }

			this.files.forEach(function( f ) {
					var destFile = f.dest,
							srcFile = Array.isArray( f ) ? f.src.shift() : f.orig.src.shift();

					if ( !grunt.file.exists( srcFile ) ) {
						grunt.log.warn( 'Source file "' + srcFile + '" not found.' );
						return false;
					}
					compileJsic( srcFile, destFile, config );
			});

    });
};
