/*! grunt-contrib-cjsc - v0.0.3 - 2014-01-27 */var require=function(){var e=[],o=[],s={},r=function(r){if("undefined"!=typeof e[r])return e[r].exports;if(s={id:r,filename:r,parent:s,children:[],exports:{},loaded:!1},"undefined"==typeof o[r])throw new Error("The factory of "+r+" module not found");return e[r]=o[r](require,s.exports,s),e[r].loaded=!0,e[r].parent.children&&e[r].parent.children.push(e[r]),e[r].exports};return r.def=function(e,s){o[e]=s},r}();require.def("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/main.js",function(e,o,s){return console.log("main.js running..."),console.log("Imported name in main.js is `%s`",e("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep1.js").name),console.log("Getting imported object from the cache:"),console.log(" imported name in main.js is still `%s`",e("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep1.js").name),s}),require.def("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep1.js",function(e,o,s){return console.log("dep1.js running..."),console.log("Imported name in dep1.js is `%s`",e("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep2.js").name),o.name="dep1",s.exports=o,s}),require.def("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/lib/dep2.js",function(e,o,s){return console.log("dep2.js running..."),o.name="dep2",s.exports=o,s}),require("/repositories/home/sheiko/vhosts/os.htdocs/grunt-contrib-cjsc/fixture/main.js");