exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./page.spec.js'],
  params: {
    baseUrl: 'http://localhost:3000',
    mobile: false,
    explorationDelay: 1000
  },
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceMetrics': {
          'width': 1400,
          'height': 800,
          'pixelRatio': 3.0
        }
      }
    }
  },
};
