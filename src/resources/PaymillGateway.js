const Http = require('./http')

const ChecksumsGateway = require('./ChecksumsGateway')

class PaymillGateway {
  constructor (config) {
    this.config = config
    this.http = new Http(this.config)
    this.checksums = new ChecksumsGateway(this)
  }
} //

module.exports = PaymillGateway
