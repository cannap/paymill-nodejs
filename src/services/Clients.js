const Service = require('./Service')

class Clients extends Service {
  constructor (service) {
    super()
    this.service = service
  }
  /**
  *  Create a new Client
  * @param {Object} content
  */
  create (content) {
    return this.service.http.post({
      url: 'clients',
      body: content
    })
  }

  details (client) {
    return this.service.http.get({ url: `clients/${client}` })
  }
  /**
  *
  * @param {Integer} client
  * @param {Object} content

  */
  update (client, content) {
    return this.service.http.put({
      url: `clients/${client}`,
      body: content
    })
  }

  remove (client) {
    return this.service.http.delete({ url: `clients/${client}` })
  }

  list () {
    return this.service.http.get({ url: 'clients' })
  }

  export () {
    return this.service.http.get(
      {
        url: `clients`,
        json: false
      },
      { Accept: 'text/csv' }
    )
  }
}

module.exports = Clients
