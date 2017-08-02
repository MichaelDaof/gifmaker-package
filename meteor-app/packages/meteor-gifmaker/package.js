Package.describe({
  name: 'meteor-gifmaker',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/MichaelDaof/gifmaker-package.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
  api.use('raix:ui-dropped-event');
  api.addFiles('client/save_file.js', 'client');
  api.addFiles('client/state.js', 'client');
  api.addFiles('client/make_gif.js', 'client');
  api.addFiles('lib/gifshot.js', 'client');
});
