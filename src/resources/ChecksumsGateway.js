const Gateway = require('./Gateway')

class Checksums extends Gateway {
  constructor (gateway) {
    super()
    this.gateway = gateway
  }
  create (content) {
    return this.gateway.http.post('checksums', content)
  }
}

module.exports = Checksums
