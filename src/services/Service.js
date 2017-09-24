'use strict'
class Service {
  filter () {
    console.log(this.content)
    this.content.amount = 200
    return this
  }
}

module.exports = Service
