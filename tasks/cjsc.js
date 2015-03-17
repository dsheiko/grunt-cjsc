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

          grunt.verbose.writeln( "Exec: cjsc " + srcFile + " -o " + destFile );

          try {
            cjsc( args, config.config || {}, done );
           } catch ( err ) {
             console.log( clc.red( " " + err.message || err  ) );
           }

      },
      /**
       * Run cjsc by a given file config entity
       * @param {Object} fConfig
       * @param {Object} config
       * @param {Fucntion} done
       * @returns {Boolean}
       */
      run = function( fConfig, config, done ) {
              /** @type {String} */
          var destFile = fConfig.dest,
              /** @type {String} */
              srcFile = Array.isArray( fConfig ) ? fConfig.src.shift() : fConfig.orig.src.shift();

          if ( !grunt.file.exists( srcFile ) ) {
            grunt.log.warn( "\n Source file " + srcFile.cyan + " not found." );
            return;
          }
          grunt.log.writeln( "\n Compiling " + srcFile.cyan + "..." );
          compileFile( srcFile, destFile, config, function(){
            grunt.log.writeln( " File " + destFile.cyan + " created" );
            done();
          });
      },
      /**
       *
       * @param {Array} files
       * @param {Object} config
       * @param {Function} allDone
       */
      Iterator = function ( files, config, allDone ) {
        return {
          runNext: function() {
                /** @type {Object} */
            var that = this,
                /** @type {Object} */
                fileCfg = files.shift();

            if ( !fileCfg ) {
              return allDone();
            }
            run( fileCfg, config, function(){
              that.runNext();
            });
          }
        };
      };


    grunt.registerMultiTask( "cjsc", "Run cjsc", function() {
      /** @type {Object} */
      var defaults = {
            minify: false
          },
          /** @type {cjscDone} done */
          allDone = this.async(),
          /** @type {Object} */
          it = new Iterator( this.files, this.options( defaults ), function(){
            allDone( true );
          });

      if ( this.files.length < 1 ) {
        grunt.verbose.warn( "Destination not written because no source files were provided." );
      }

      it.runNext();

    });
};
