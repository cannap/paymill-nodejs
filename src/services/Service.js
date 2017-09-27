class Service {
  order (order = 'order') {
    return this
  }
  count (count) {
    this.content.body = Object.assign(this.content.body, { count })
    return this
  }
  skip (offset) {
    this.content.body = Object.assign(this.content.body, { offset })
    return this
  }
  // just an alias for skip
  offset (offset) {
    this.content.body = Object.assign(this.content.body, { offset })
    return this
  }
  /*
  filter (filter) {
    return this
  } */
}

module.exports = Service
