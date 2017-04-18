module.exports = {
  plugin: function () { /*noop*/ },
  'plugin:name': 'CSS HMR',
  hooks: {
    "client:js": require('fs').readFileSync(__dirname + '/client.js', 'utf8')
  }
};
