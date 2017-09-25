const Service = require('./Service')

class CreateRest extends Service {
  constructor () {
    super()
    this.content = {}
  }

  createGateway (operations) {
    operations.forEach(property => {
      this[property] = this.restEndpoints[property]
    })
  }
  get restEndpoints () {
    return {
      create (content) {
        return this.service.http.post({
          url: this.endpoint,
          body: content
        })
      },
      update (client, content) {
        return this.service.http.put({
          url: `${this.endpoint}/${client}`,
          body: content
        })
      },
      remove (id) {
        return this.service.http.delete({ url: `${this.endpoint}/${id}` })
      },
      list (csv = false) {
        this.content = {
          url: this.endpoint,
          json: !csv,
          body: {},
          headers: { Accept: csv ? 'text/csv' : '*' }
        }
        return this
        // return this.service.http.get(this.content)
      },

      listAll (csv = false) {
        this.content = {
          url: this.endpoint,
          json: !csv,
          body: {},
          headers: { Accept: csv ? 'text/csv' : '*' }
        }
        return this.service.http.get(this.content)
      },
      details (id) {
        return this.service.http.get({ url: `${this.endpoint}/${id}` })
      }
    }
  }
  fetch () {
    return this.service.http.get(this.content)
  }
}

module.exports = CreateRest
