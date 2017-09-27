class UnexpectedError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    // Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

class HttpError extends Error {
  constructor (status, message) {
    super(message)
    this.name = this.constructor.name
    // Error.captureStackTrace(this, this.constructor)
    this.status = status
    this.message = message
  }
}

module.exports = {
  HttpError,
  UnexpectedError
}
