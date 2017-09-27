const Service = require('./Service')
const createThrottle = require('async-throttle')

class CreateRest extends Service {
  constructor () {
    super()
    this.content = {
      body: { wtf: 'fwef' }
    }
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
      /**
       *
       * @param {Integer}
       *
       */
      details (id) {
        return this.service.http.get({ url: `${this.endpoint}/${id}` })
      }
    }
  }

  /**
   *  Create many
   * @param {Array} contents - Array with Ids
   * @param {Integer} - throttleLimit Limit how much requests at the same time
   * @return {Array} - with the created data
   */
  createMany (contents, throttleLimit = 2) {
    const throttle = createThrottle(throttleLimit)
    return Promise.all(
      contents.map(content =>
        throttle(() => {
          return this.create(content)
        })
      )
    )
  }

  /**
   *  Delete many
   * @param {Array} ids
   * @param {Integer} throttleLimit Limit how much requests at the same time
   * @return {Array} - every delete item returns "null"
   */
  removeMany (ids, throttleLimit = 2) {
    const throttle = createThrottle(throttleLimit)
    return Promise.all(
      ids.map(id =>
        throttle(() => {
          return this.remove(id)
        })
      )
    )
  }

  /**
   * Starts the requests
   */
  fetch (save = false) {
    return this.service.http.get(this.content)
  }
}

module.exports = CreateRest
