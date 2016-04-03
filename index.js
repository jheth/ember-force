/* jshint node: true */
/* global jsforce */
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
        //works: 'insideProject',
        anonymousOptions: [
          '<name>'
        ],
        availableOptions: [
          {
            name: 'include-relationships',
            type: Boolean,
            default: false
          },
          {
            name: 'login-url',
            type: String,
            default: 'https://login.salesforce.com'
          }
        ],
        run: function(commandOptions, rawArgs) {

          var jsforce = require('jsforce');
          var relationships = commandOptions.includeRelationships;
          var loginUrl = commandOptions.loginUrl;
          var sobjectType = rawArgs[0];

          console.log("Enter SFDC Username: ");
          var username = process.stdin.read();
          console.log("Enter SFDC Password: ");
          var password = process.stdin.read();

          console.log('--------------------\n' + 'Generated model for ' + sobjectType);
          console.log(loginUrl);

          var conn = new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : loginUrl
          });

          conn.login(username, password, function(err, userInfo) {
            console.log(err)
            console.log(userInfo);
            if (err) {
              return console.log(err);
            }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            console.log(conn.accessToken);
            console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);

            // ...
          }).then(function(d) {
              console.log('something', d);
          }, function(e) {
            console.log('huh', e);
          });

          // console.log(conn);
          // .then(function() {
          //   console.log('got here');
          //
            conn.sobject(sobjectType).describe(function(err, meta) {
              console.log('describe object');
              if (err) {
                return console.log(err);
              }
              console.log('Label : ' + meta.label);
              console.log('Num of Fields : ' + meta.fields.length);
              meta.fields.forEach(function(field) {
                if (field.name != 'Id') {
                  console.log(field.name);
                }
              });

            });
          // });
          console.log('done');
        }
      }
    }
  }
};
