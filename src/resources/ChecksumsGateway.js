const Gateway = require('./Gateway')

class Checksums extends Gateway {
  constructor (gateway) {
    super()
    this.gateway = gateway
  }
  create (content, addShipping = false) {
    if (addShipping) {
      content.shipping_address = content.billing_address
    }

    return this.gateway.http.post('checksums', content)
  }
}

module.exports = Checksums
