const Http = require('./http')
const Checksums = require('./Checksums')
const Clients = require('./Clients')
const Payments = require('./Payments')

class PaymillService {
  constructor (config) {
    this.config = config
    this.http = new Http(this.config)
    this.checksums = new Checksums(this)
    this.payments = new Payments(this)
    this.clients = new Clients(this)
  }
}

module.exports = PaymillService
