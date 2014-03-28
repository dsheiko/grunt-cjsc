# grunt-cjsc
[![NPM version](https://badge.fury.io/js/grunt-contrib-cjsc.png)](http://badge.fury.io/js/grunt-contrib-cjsc)

> A grunt task for running CommonJS modules compiler (https://github.com/dsheiko/cjsc)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-cjsc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks( "grunt-contrib-cjsc" );
```

## The "cjsc" task

### Overview
In your project's Gruntfile, add a section named `cjsc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cjsc: {
    your_target: {
			options: {
				sourceMap: "<string>",
				sourceMapUrl: "<string>",
				minify: false,
				banner: "/*! <string> %> */",
				config: {
					"<dependency-name>": {
						"path": "<dependency-path>",
						"require": "<dependency-name>",
						"exports": "<object>"
					}
				}
			},
      files: {
        "destination file" : "source file",
        "destination file" : "source file"
      }
    }
  }
})
```


### Usage Examples

#### Compile main.js to build.js
```js
grunt.initConfig({
  cjsc: {
    development: {
        files: {
          "./fixture/build.js" : "./fixture/main.js"
        }
      }
  }
});
```

#### Compile main.js to build.js and generate source map
```js
grunt.initConfig({
  cjsc: {
    development: {
			options: {
				sourceMap: "fixture/*.map",
				sourceMapUrl: "http://localhost/",
			},
			files: {
				"./fixture/build.js" : "./fixture/main.js"
			}
		}
  }
});
```

#### Compile with compression and prepend destination code with a banner
```js
grunt.initConfig({
	pkg: grunt.file.readJSON( "package.json" ),
  cjsc: {
		options: {
			minify: true,
			banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
				"<%= grunt.template.today(\"yyyy-mm-dd\") %> */"
		},
    development: {
			files: {
				"./fixture/build.js" : "./fixture/main.js"
			}
		}
  }
});
```

#### Compile main.js to build.js by using dependency configuration
```js
grunt.initConfig({
  cjsc: {
		options: {
			config: {
				"jQuery": {
					"path": "./jquery-stub.js"
				},
				"plugin": {
					"path": "./jquery-plugin-stub.js",
					"require": "jQuery",
					"exports": "jQuery"
				}
			}
		},
    development: {
			files: {
				"./fixture/build.js" : "./fixture/main.js"
			}
		}
  }
});
```

### Usage Examples

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/2740ed5c70bf24be96d91b5987f9350b "githalytics.com")](http://githalytics.com/dsheiko/grunt-contrib-cjsc)