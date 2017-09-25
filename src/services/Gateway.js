class CreateRest {
  createGateway (operations) {
    operations.forEach(property => {
      this[property] = this.restFunctions[property]
    })
  }
  get restFunctions () {
    return {
      create (content) {
        return this.service.http.post({
          url: this.base,
          body: content
        })
      },
      update (client, content) {
        return this.service.http.put({
          url: `${this.base}/${client}`,
          body: content
        })
      },
      remove (id) {
        return this.service.http.delete({ url: `${this.base}/${id}` })
      },
      list (csv = false) {
        this.content = {
          url: this.base,
          json: !csv,
          body: {},
          headers: { Accept: csv ? 'text/csv' : ' ' }
        }

        return this.service.http.get(this.content)
      },
      details (id) {
        return this.service.http.get({ url: `${this.base}/${id}` })
      }
    }
  }
}

module.exports = CreateRest
