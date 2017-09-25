class Service {
  order (order = 'order') {
    console.log(this.content)
    return this
  }

  count (count) {
    this.content.body = Object.assign({}, { count })
    return this
  }

  offset (offset) {}
  filter (filter) {
    // Todo: i think we need to map filters with underscore(_)
    // this.content.body = Object.assign({}, { filter })
  }

  fetch () {
    return this.service.http.get(this.content)
  }
}

module.exports = Service
