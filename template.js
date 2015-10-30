/*
 * Basic HTML Project template
 *
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic HTML Project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'notes here';

// Template-specific notes to be displayed after question prompts.
exports.after = 'now run npm install to get dependancies';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  var fs = require('fs');

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),

  ], function(err, props) {

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {
      process: function (content, srcpath) {
        console.log(srcpath);
        var lastPath = srcpath.split('/').pop();
        if(lastPath == 'index.html'){
          var updatedContent = content.replace(/(main.css)/g, props.name+".css");
          return updatedContent.replace(/(global.js)/g, props.name+".js");
        }
        return content;
      }
    });

    grunt.file.write(init.destpath()+'/src/js/'+props.name+'.js', '');
    grunt.file.write(init.destpath()+'/src/sass/'+props.name+'.scss', '@import "partials/reset";');

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      description: props.description,
      devDependencies: {
        "grunt": "~0.4.5",
        "grunt-contrib-sass": "^0.9.2",
        "grunt-contrib-concat": "^0.5.0",
        "grunt-contrib-uglify": "^0.6.0",
        "grunt-contrib-watch": "^0.6.1"
      },
    });

    // All done!
    done();
  });

};
