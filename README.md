# webpack-browser-sync-css-hmr

Naive implementation of HMR for CSS when using Webpack & Browsersync.

Sample usage:
```
const browsersync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const AnsiToHTML = require('ansi-to-html');
const convert = new AnsiToHTML();

const webpackConfig = require('./webpack.config')('development');
const bundler = webpack(webpackConfig);

bundler.plugin('done', function(stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    // This is optional but chances are you'll want it.
    return browsersync.sockets.emit('fullscreen:message', {
      title: 'Error:',
      body: convert.toHtml(stats.toString({ colors: true })),
      timeout: 100000
    });
  } else {
    return browsersync.sockets.emit('styles:update');
  }
});

browsersync.init({
  host: 'localhost',
  port: 3000,
  proxy: 'https://wordpress.local/',
  open: false,
  files: ['**/*.css, **/*.js, **/*.php'],
  logFileChanges: false,
  plugins: ['bs-pretty-message', 'webpack-browser-sync-css-hmr'],
});
```
