/* jshint unused: false */
/**
 * @typedef module
 * @type {object}
 * @property {string} id - the identifier for the module.
 * @property {string} filename - the fully resolved filename to the module.
 * @property {module} parent - the module that required this one.
 * @property {module[]} children - the module objects required by this one.
 * @property {boolean} loaded - whether or not the module is done loading, or is in the process of loading
 */
/**
	*
	* Define scope for `require`
	*/
var require = (function(){
	var /**
			* Store modules (types assigned to module.exports)
			* @type {module[]}
			*/
			imports = [],
			/**
			 * Store the code that constructs a module (and assigns to exports)
			 * @type {*[]}
			 */
			factories = [],
			/**
			 * @type {module}
			 */
			module = {},
			/**
			 * Implement CommonJS `require`
			 * http://wiki.commonjs.org/wiki/Modules/1.1.1
			 * @param {string} filename
			 * @returns {*}
			 */
			_require = function( filename ) {

				if ( typeof imports[ filename ] !== "undefined" ) {
					return imports[ filename ].exports;
				}
				module = {
					id: filename,
					filename: filename,
					parent: module,
					children: [],
					exports: {},
					loaded: false
				};
				if ( typeof factories[ filename ] === "undefined" ) {
					throw new Error( "The factory of " + filename + " module not found" );
				}
				// Called first time, so let's run code constructing (exporting) the module
				imports[ filename ] = factories[ filename ]( require, module.exports, module );
				imports[ filename ].loaded = true;
				if ( imports[ filename ].parent.children ) {
					imports[ filename ].parent.children.push( imports[ filename ] );
				}
				return imports[ filename ].exports;
			};
	/**
	 * Register module
	 * @param {string} filename
	 * @param {function(module, *)} moduleFactory
	 */
	_require.def = function( filename, moduleFactory ) {
		factories[ filename ] = moduleFactory;
	};
	return _require;
}());

require.def( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/main.js", function( require, exports, module ){
console.log( "main.js running..." );
console.log( "Imported name in main.js is `%s`", require( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep1.js" ).name );
console.log( "Getting imported object from the cache:" );
console.log( " imported name in main.js is still `%s`", require( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep1.js" ).name );
	return module;
});

require.def( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep1.js", function( require, exports, module ){
console.log( "dep1.js running..." );
console.log( "Imported name in dep1.js is `%s`", require( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep2.js" ).name );
exports.name = "dep1";
	module.exports = exports;
	return module;
});

require.def( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep2.js", function( require, exports, module ){
console.log( "dep2.js running..." );
exports.name = "dep2";
	module.exports = exports;
	return module;
});

require( "/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/main.js" );
