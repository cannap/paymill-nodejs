const Http = require('./http')

const ChecksumsGateway = require('./ChecksumsGateway')
const ClientsGateway = require('./ClientsGateway')
const TransactionsGateway = require('./TransactionsGateway')

class PaymillGateway {
  constructor (config) {
    this.config = config
    this.http = new Http(this.config)
    this.checksums = new ChecksumsGateway(this)
    this.transactions = new TransactionsGateway(this)
    this.clients = new ClientsGateway(this)
  }
}

module.exports = PaymillGateway
