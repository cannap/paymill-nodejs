const Gateway = require('./Gateway')
class Clients extends Gateway {
  constructor (service) {
    super()
    this.service = service
    this.endpoint = 'clients'
    const gateways = ['create', 'list', 'update', 'remove', 'details']
    this._createGateway(gateways)
  }
}

module.exports = Clients
