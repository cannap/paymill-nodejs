function errorMaker (type) {
  return function (message) {
    let err = new Error(message || '')
    err.type = err.name = type
    return err
  }
}

module.exports = {
  TransactionError: errorMaker('Transaction Error'),
  Unauthorized: errorMaker('Unauthorized'),
  BadRequest: errorMaker('Bad Request'),
  PreconditionFailed: errorMaker('Precondition Failed'),
  NotFound: errorMaker('Not Found'),
  UnexpectedError: errorMaker('Unexpected Error')
}
