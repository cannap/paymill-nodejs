const Gateway = require('./Gateway')

class Transactions extends Gateway {
  constructor (gateway) {
    super()
    this.gateway = gateway
  }
  create (content) {
    return this.gateway.http.post('checksums', content)
  }
}

module.exports = Transactions
