/*
 * grunt-jscs
 * https://github.com/dsheiko/grunt-jscs
 *
 * Copyright (c) 2013 Dmitry Sheiko
 * Licensed under the MIT license.
 * @jscs standard:Jquery
 */

'use strict';

var async = require( "async" );

module.exports = function( grunt ) {

    var compileJsic = function( srcFile, destFile, config, done ) {
          var cjsc = require( "cjsc" ),
              args = {
                targets: [ srcFile, destFile ],
                options: {},
                plugins: []
              },
              map = {
                sourceMap: "source-map",
                sourceMapUrl: "source-map-url",
                sourceMapRoot: "source-map-root"
              },
              key;

          for ( key in config ) {
            if ( config.hasOwnProperty( key ) && key !== "config" ) {
              args.options[ map[ key ] || key ] = config[ key ];
            }
          }

          grunt.log.writeln( 'File ' + destFile.cyan + ' created.' );
          grunt.verbose.writeln( 'Exec: cjsc ' + srcFile + ' -o ' + destFile );
          cjsc( args, config.config || {}, done );
      };


    grunt.registerMultiTask( 'cjsc', 'Run cjsc', function() {
      var defaults = {
            minify: false
          },
          config = this.options( defaults ),
          allDone = this.async();

      if ( this.files.length < 1 ) {
        grunt.verbose.warn( "Destination not written because no source files were provided." );
      }

      async.each( this.files, function( f, done ) {
          var destFile = f.dest,
              srcFile = Array.isArray( f ) ? f.src.shift() : f.orig.src.shift();

          if ( !grunt.file.exists( srcFile ) ) {
            grunt.log.warn( 'Source file "' + srcFile + '" not found.' );
            return false;
          }
          compileJsic( srcFile, destFile, config, done );
      }, function( err ){
        if ( err ) {
          return;
        }
        allDone();
      });

    });
};
