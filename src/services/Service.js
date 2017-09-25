class Service {
  order (order = 'order') {
    return this
  }
  // Todo: find a way to just populate this to the list method maybe split stuff in extra classes
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

  filter (filter) {
    //  const filters = ['desc', 'asc']

    return this
  }
}

module.exports = Service
