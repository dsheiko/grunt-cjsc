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
      files: {
        "destination file" : "source file",
        "destination file" : "source file"
      }
    }
  }
})
```


### Usage Examples

#### Compile src1.js to dest1.js
```js
grunt.initConfig({
  cjsc: {
    development: {
        files: {
          "./fixture/dest1.js" : "./fixture/src1.js"
        }
      }
  }
});
```

#### Compile src1.js to dest1.js and generate source map
```js
grunt.initConfig({
  cjsc: {
		options: {
			sourceMap: "fixture/*.map",
			sourceMapUrl: "http://localhost/",
		},
    development: {
			files: {
				"./fixture/dest1.js" : "./fixture/src1.js"
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
				"./fixture/dest1.js" : "./fixture/src1.js"
			}
		}
  }
});
```

### Usage Examples

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

