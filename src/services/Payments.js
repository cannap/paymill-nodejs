const Gateway = require('./Gateway')
class Payments extends Gateway {
  constructor (service) {
    super()
    this.service = service
    this.endpoint = 'payments'
    const gateways = ['create', 'list', 'update', 'details', 'remove']
    this._createGateway(gateways)
  }
}

module.exports = Payments
