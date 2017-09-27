const Service = require('./Service')
const createThrottle = require('async-throttle')

class CreateRest extends Service {
  constructor () {
    super()
    this.content = {}
  }

  _createGateway (operations) {
    operations.forEach(property => {
      this[property] = this._restEndpoints[property]
    })
  }
  get _restEndpoints () {
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
      details (id) {
        return this.service.http.get({ url: `${this.endpoint}/${id}` })
      }
    }
  }
  fetch () {
    return this.service.http.get(this.content)
  }

  listAll (csv = false) {
    this.content = {
      url: this.endpoint,
      json: !csv,
      body: {},
      headers: { Accept: csv ? 'text/csv' : '*' }
    }
    return this.service.http.get(this.content)
  }

  /**
   *  Create many
   * @param {Array} contents
   */
  createMany (contents) {
    return Promise.all(
      contents.map(content => {
        return this.create(content)
      })
    )
  }

  /**
   *  Delete many
   * @param {Array} ids
   * @param {Integer} throttleLimit Limit how much requests at the same time
   */
  async removeMany (ids, throttleLimit = 2) {
    const throttle = createThrottle(throttleLimit)

    return Promise.all(
      ids.map(id =>
        throttle(async () => {
          return this.remove(id)
        })
      )
    )
  }
}

module.exports = CreateRest
