const Gateway = require('./Gateway')
class Clients extends Gateway {
  constructor (service) {
    super()
    const gateways = ['create', 'list', 'update', 'remove', 'details']

    this.service = service
    this.endpoint = 'clients'
    this._createGateway(gateways)
  }
}

module.exports = Clients
