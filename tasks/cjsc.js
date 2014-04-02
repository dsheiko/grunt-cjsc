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
							argv = [ "node", "cjsc" ],
							cmd = 'node cjsc ' + srcFile + ' ' + destFile;

					argv.push( srcFile );
					argv.push( destFile );

					if ( config.sourceMap ) {
						argv.push( "--source-map=" + config.sourceMap );
					}
					if ( config.sourceMapUrl ) {
						argv.push( "--source-map-url=" + config.sourceMapUrl );
					}
					if ( config.sourceMapRoot ) {
						argv.push( "--source-map-root=" + config.sourceMapRoot );
					}

					if ( config.minify ) {
						argv.push( "-M" );
					}
					if ( config.banner ) {
						argv.push( "--banner=" + config.banner );
					}
					grunt.log.writeln('File ' + destFile.cyan + ' created.');
					grunt.verbose.writeln( 'Exec: ' + cmd );

					cjsc( argv, config.config || {} );
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
