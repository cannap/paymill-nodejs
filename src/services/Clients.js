const Service = require('./Service')

class Clients extends Service {
  constructor (service) {
    super()
    this.service = service
  }
}

module.exports = Clients
