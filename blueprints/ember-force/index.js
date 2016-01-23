'use strict';

var EOL         = require('os').EOL;

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },
  description: 'Default blueprint for ember-force',

  afterInstall: function(/*options*/) {
    var self = this;

    return this.addBowerPackageToProject('jsforce')
    // .then(function () {
    //   return self.addToConfig('contentSecurityPolicy', '{ \'connect-src\': "\'self\' *.salesforce.com" }');
    // })
    .then(function () {
      var output = 'EmberForce has been installed. Please configure connection details in config/environment.js';
      console.log(EOL, output, EOL);
    });
  },

  /* taken from emberfire addon */
  addToConfig: function (key, value) {
    var self = this;
    return this.fileContains('config/environment.js', key + ':').then(function (contains) {
      if (contains) { return true; }

      var options = { after: '    environment: environment,' + EOL };
      return self.insertIntoFile('config/environment.js', '    ' + key + ': ' + value + ',', options);
    });
  },

  fileContains: function (filePath, snippet) {
    return readFile(filePath).then(function (fileContents) {
      return fileContents.toString().indexOf(snippet) !== -1;
    });
  }
};
