const Gateway = require('./Gateway')

class Clients extends Gateway {
  constructor (gateway) {
    super()
    this.gateway = gateway
  }
}

module.exports = Clients
