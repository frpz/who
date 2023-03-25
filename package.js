Package.describe({
  name: 'frpz:who',
  summary: "Allows you to see who's on your Meteor app",
  version: '0.1.7',
  git: "https://github.com/frpz/who.git"
});

Package.onUse(function(api) {
  api.use('standard-app-packages@1.0.9');
  api.use('accounts-password@2.3.1',{weak: true});
  api.use('iron:router@1.2.0',{weak: true});
  api.versionsFrom('2.7.1');
  api.export("frpzWho");
  api.addFiles('frpz-who.html', 'client');
  api.addFiles('frpz-who-client.js', 'client');
  api.addFiles('frpz-who-server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('frpz:who');
  api.addFiles('frpz-who-tests.js');
});
