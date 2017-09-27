const Gateway = require('./Gateway')
class Transactions extends Gateway {
  constructor (service) {
    super()
    this.service = service
    this.endpoint = 'clients'
    const gateways = ['list', 'update', 'details']
    this._createGateway(gateways)
  }
}

module.exports = Transactions
