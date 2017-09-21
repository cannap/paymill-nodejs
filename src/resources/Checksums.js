const PaymillResources = require('../http')
// const Paymill = require('../index')
function makeMethod (obj) {
  return 'wtf'
}

class Checksums extends PaymillResources {
  constructor () {
    super()
    console.log(this)
  }

  create () {
    return makeMethod({ yo: 'yo' })
  }
}

module.exports = Checksums
