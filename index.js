/* jshint node: true */
/* global jsforce */
'use strict';

module.exports = {
  name: 'ember-force',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/jsforce/build/jsforce.min.js');
  }

};
