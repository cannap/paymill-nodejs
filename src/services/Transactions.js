const Gateway = require('./Gateway')
class Transactions extends Gateway {
  constructor (service) {
    super()
    const gateways = ['list', 'update', 'details']
    this.service = service
    this.endpoint = 'clients'
    this._createGateway(gateways)
  }
}

module.exports = Transactions
