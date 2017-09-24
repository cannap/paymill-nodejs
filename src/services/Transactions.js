'use strict'
const Service = require('./Service')

class Transactions extends Service {
  constructor (service) {
    super()
    this.service = service
  }
  create (content) {
    return this.service.http.post('checksums', content)
  }
}

module.exports = Transactions
