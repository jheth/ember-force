/*jshint node:true*/

var EOL         = require('os').EOL;
var RSVP        = require('rsvp');

module.exports = {
  description: 'Generate DS.Model from Salesforce SObject',
  //works: 'insideProject',
  anonymousOptions: [
    '<name>'
  ],

  beforeInstall: function(options) {
    // Perform extra work here.
    return new RSVP.Promise(function(resolve, reject) {
      console.log('options', options.entity.name);
      return fetchObjectAttributes(options.entity.name).then(function(response) {
        // console.log(response);
        console.log('returning from beforeInstall');
        options.entity.fields = response;
        resolve(response);
      }, function(error) {
        reject(error);
        console.log(error);
      });
    });
  },

  locals: function(options) {
    var objectFields = [];
    var attrs = [];
    objectFields.forEach(function(field) {
      console.log(field);
      var name = field.name;
      var type = field.type;

      attr = dsAttr(name, type);
      attrs.push(name + ': ' + attr);
    });

    attrs = attrs.join(',' + EOL + '  ');

    console.log('returning from locals');

    return {
      attrs: attrs,
    };
  }
};

function dsAttr(name, type) {
  switch (type) {
  case 'belongs-to':
    return 'belongsTo(\'' + name + '\')';
  case 'has-many':
    return 'hasMany(\'' + name + '\')';
  case '':
    //"If you don't specify the type of the attribute, it will be whatever was provided by the server"
    //http://emberjs.com/guides/models/defining-models/
    return 'attr()';
  default:
    return 'attr(\'' + type + '\')';
  }
}

function fetchObjectAttributes(sobjectType) {
  console.log('fetch', sobjectType);
  var jsforce = require('jsforce');
  var sobjectType = 'Opportunity';

  console.log('--------------------\n' + 'Generated model for ' + sobjectType);

  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
  });

  username = '';
  password = '';
  console.log(username);

  return conn.login(username, password, function(err, userInfo) {
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
    console.log('describe object', d);

    return conn.sobject(sobjectType).describe(function(err, meta) {

      if (err) {
        console.log(error);
        return console.log(err);
      }
      console.log('Label : ' + meta.label);
      console.log('Num of Fields : ' + meta.fields.length);

      return meta.fields;
      // meta.fields.forEach(function(field) {
      //   if (field.name != 'Id') {
      //     console.log(field.name);
      //   }
      // });
    }).then(function(response) {
      console.log('describe fields');
      return response.fields;
    });

  });

}

function gogo(options) {
  return new RSVP.Promise(function(resolve, reject) {
    console.log('options', options.entity.name);
    return fetchObjectAttributes(options.entity.name).then(function(response) {
      // console.log(response);
      console.log('returning from beforeInstall');
      options.entity.fields = response;
      resolve(response);
    }, function(error) {
      reject(error);
      console.log(error);
    });
  });
}
