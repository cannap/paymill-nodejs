const Gateway = require('./Gateway')
class Clients extends Gateway {
  constructor (service) {
    super()

    this.service = service
    this.base = 'clients'
    const gateways = ['create', 'list', 'update', 'remove', 'details']
    this.createGateway(gateways)
  }
}

module.exports = Clients
