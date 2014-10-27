Package.describe({
  name: 'frpz:who',
  summary: ' Update a collection with the list of users currently connected to your page. It shows registrerd and unregistred users. ',
  version: '0.1.0'
});

Package.onUse(function(api) {
  api.use('standard-app-packages');
  api.use('accounts-password',{weak: true});
  api.use('iron:router',{weak: true});
  api.versionsFrom('0.9.0');
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
