const Gateway = require('./Gateway')
class Offers extends Gateway {
  constructor (service) {
    super()
    const gateways = ['create', 'list', 'update', 'remove', 'details']
    this.service = service
    this.endpoint = 'offers'
    this._createGateway(gateways)
  }
}

module.exports = Offers
