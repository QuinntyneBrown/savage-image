/*

Build HTML files using any data loaded onto the shared state.

*/

var path = require("path");
var shell = require("shelljs");

module.exports = function(grunt) {

  grunt.template.include = function(where, data) {
    var file = grunt.file.read(path.resolve("src/", where));
    return grunt.template.process(file, {data: data || grunt.data});
  };

  grunt.registerTask("build", "Processes index.html using shared data (if available)", function() {
    var files = grunt.file.expandMapping(["**/*.html", "!**/_*.html", "!lib/**/*.html"], "build", { cwd: "src" });
    var data = Object.create(grunt.data || {});
    data.t = grunt.template;
    files.forEach(function(file) {
      var src = file.src.shift();
      var input = grunt.file.read(src);
      var output = grunt.template.process(input, { data: data });
      grunt.file.write(file.dest, output);
    });

    shell.cp("./src/counties.svg", "build");
  });

};