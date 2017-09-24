const Service = require('./Service')

class Checksums extends Service {
  constructor (service) {
    super()
    this.service = service
    this.content = {}
  }

  create (content, addShipping = false) {
    if (addShipping) {
      content.shipping_address = content.billing_address
    }
    if (!content.hasOwnProperty('checksum_type')) {
      return {
        forPaypal: () => {
          content.checksum_type = 'paypal'
          return this.service.http.post('checksums', content)
        },
        forSofort: () => {
          content.checksum_type = 'sofort'
          return this.service.http.post('checksums', content)
        }
      }
    }
    return this.service.http.post('checksums', content)
  }

  list (content) {
    // This function can have a filter option
    // It would be called like
    // instance.checksums.list('what i want').filter() // but how?
    return this.service.http.get('checksums', this.content)
  }
}
module.exports = Checksums
