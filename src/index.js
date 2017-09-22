const Config = require('./config')
const PayMillService = require('./services/PaymillService')

let init = config => new PayMillService(Config(config))

module.exports = {
  init
}
