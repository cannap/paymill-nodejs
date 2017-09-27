const Http = require('./http')
const Checksums = require('./Checksums')
const Clients = require('./Clients')
const Payments = require('./Payments')
const Transactions = require('./Transactions')

class PaymillService {
  constructor (config) {
    this.config = config
    this.http = new Http(this.config)
    this.checksums = new Checksums(this)
    this.payments = new Payments(this)
    this.clients = new Clients(this)
    this.transactions = new Transactions(this)
  }
}

module.exports = PaymillService
