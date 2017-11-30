const Gateway = require('./Gateway')
class Refunds extends Gateway {
  constructor (service) {
    super()
    this.service = service
    this.endpoint = 'offers'
    const gateways = ['list', 'update', 'details']
    this._createGateway(gateways)
  }
}

module.exports = Refunds
