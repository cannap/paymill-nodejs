'use strict'
const defaultConfig = {
  host: 'api.paymill.com',
  version: 'v2.1',
  authKey: 'xx'
}

module.exports = function mergeConfig (config) {
  return Object.assign(defaultConfig, config)
}
