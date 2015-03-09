/*
 * grunt-jscs
 * https://github.com/dsheiko/grunt-jscs
 *
 * Copyright (c) 2013 Dmitry Sheiko
 * Licensed under the MIT license.
 * jscs standard:Jquery
 */


    /** @type {module:cli-color} */
var async = require( "async" ),
    /** @type {module:cli-color} */
    clc = require( "cli-color" );

"use strict";

/**
 * @callback cjscDone
 * @param {String} code - compiled code
 * @returns {void}
 */
/**
 *
 * @param {Object} grunt
 * @returns {void}
 */
module.exports = function( grunt ) {
    /**
     *
     * @param {String} srcFile
     * @param {String} destFile
     * @param {Object} config
     * @param {cjscDone} done
     * @returns {void}
     */
    var compileFile = function( srcFile, destFile, config, done ) {
          /** @type {module:cjsc} */
          var cjsc = require( "cjsc" ),
              /** @type {Object} */
              args = {
                targets: [ srcFile, destFile ],
                options: {},
                plugins: []
              },
              /** @type {Object} */
              map = {
                sourceMap: "source-map",
                sourceMapUrl: "source-map-url",
                sourceMapRoot: "source-map-root"
              },
               /** @type {String} */
              key;

          for ( key in config ) {
            if ( config.hasOwnProperty( key ) && key !== "config" ) {
              args.options[ map[ key ] || key ] = config[ key ];
            }
          }

          grunt.log.writeln( "File " + destFile.cyan + " created." );
          grunt.verbose.writeln( "Exec: cjsc " + srcFile + " -o " + destFile );

          try {
            cjsc( args, config.config || {}, done );
           } catch ( err ) {
             console.log( clc.red( " " + err.message || err  ) );
           }

      };


    grunt.registerMultiTask( "cjsc", "Run cjsc", function() {
      /** @type {Object} */
      var defaults = {
            minify: false
          },
          /** @type {Object} */
          config = this.options( defaults ),
          /** @type {cjscDone} done */
          allDone = this.async();

      if ( this.files.length < 1 ) {
        grunt.verbose.warn( "Destination not written because no source files were provided." );
      }

      async.each( this.files, function( f, done ) {
              /** @type {String} */
          var destFile = f.dest,
              /** @type {String} */
              srcFile = Array.isArray( f ) ? f.src.shift() : f.orig.src.shift();

          if ( !grunt.file.exists( srcFile ) ) {
            grunt.log.warn( "Source file \"" + srcFile + "\" not found." );
            return false;
          }
          compileFile( srcFile, destFile, config, done );
      }, function( err ){
        if ( err ) {
          return;
        }
        allDone( true );
      });
    });
};
