Package.describe({
  name: 'frpz:who',
  summary: "Allows you to see who's on your Meteor app",
  version: '0.1.3',
  git: "https://github.com/frpz/who.git"
});

Package.onUse(function(api) {
  api.use('standard-app-packages');
  api.use('accounts-password',{weak: true});
  api.use('iron:router@1.0.9',{weak: true});
  api.versionsFrom('METEOR@0.9.0');
  api.export("frpzWho");
  api.addFiles('frpz:who.html', 'client');
  api.addFiles('frpz:who-client.js', 'client');
  api.addFiles('frpz:who-server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('frpz:who');
  api.addFiles('frpz:who-tests.js');
});
