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

  /**
   *  Skips items
   * @param {Number} offset
   */
  offset (offset) {
    return this.skip(offset)
  }
  /*
  filter (filter) {
    return this
  } */
}

module.exports = Service
