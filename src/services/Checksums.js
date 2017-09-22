const Service = require('./Service')

class Checksums extends Service {
  constructor (service) {
    super()
    this.service = service
  }
  create (content, addShipping = false) {
    if (addShipping) {
      content.shipping_address = content.billing_address
    }

    return this.service.http.post('checksums', content)
  }
}

module.exports = Checksums
