/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-force',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/jsforce/build/jsforce.min.js');
  },

  includedCommands: function() {
    return {
      'salesforce:model': {
        name: 'salesforce:model',
        description: 'Generate DS.Model from Salesforce SObject',
        works: 'insideProject',
        anonymousOptions: [
          '<name>'
        ],
        availableOptions: [
          {
            name: 'include-relationships',
            type: Boolean,
            default: false
          }
        ],
        run: function(commandOptions, rawArgs) {
          var sobject = commandOptions.sobject;
          var object = rawArgs[0];
          console.log('--------------------\n' +
            'Generated model for ' + sobject);
        }
      }
    }
  }
};
