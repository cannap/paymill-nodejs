const { generateAuthString } = require('./utils')

const methods = {
  // Chechksums: require('./resources/Checksums')
}

// require('./http') //

class Paymill {
  constructor (apiKey) {
    this.auth = generateAuthString(apiKey)
    this._prepMethods()
  }

  _request (method, data) {}

  _prepMethods () {
    for (var name in methods) {
      this[name[0].toLowerCase() + name.substring(1)] = new methods[name](this)
    }
  }
}
Paymill.resource = require('./http')
var paymill = new Paymill()

/// console.log('create', paymill.chechksums.create())
module.exports = Paymill
