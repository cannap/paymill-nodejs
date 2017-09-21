const Config = require('./config')

const PayMillGateway = require('./resources/PaymillGateway')
let init = config => new PayMillGateway(Config(config))

module.exports = {
  init
} //
//
