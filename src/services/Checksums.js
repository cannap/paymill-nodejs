const Service = require('./Service')

class Checksums extends Service {
  constructor (service) {
    super()
    this.service = service
    this.content = {}
  }

  /**
   * It Creates a new Transaction
   * @param {Object} Checksum
   * @param {Boolean} addShipping
   */
  create (content, addShipping = false) {
    if (addShipping) {
      content.shipping_address = content.billing_address
    }
    if (!content.hasOwnProperty('checksum_type')) {
      return {
        forPaypal: () => {
          content.checksum_type = 'paypal'
          return this.service.http.post({
            url: 'checksums',
            body: content
          })
        },
        forSofort: () => {
          content.checksum_type = 'sofort'
          return this.service.http.post({
            url: 'checksums',
            body: content
          })
        }
      }
    }
    return this.service.http.post({
      url: 'checksums',
      body: content
    })
  }
}
module.exports = Checksums
