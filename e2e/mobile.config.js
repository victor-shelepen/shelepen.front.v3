var _ = require('lodash');
var _default = require('./default.config');

module.exports.config = _.defaultsDeep(
  {
    params: {
      mobile: true
    },
    capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
          'deviceMetrics': {
            'width': 600,
            'height': 800,
            'pixelRatio': 3.0
          }
        }
      }
    }
  },
  _default.config
);
