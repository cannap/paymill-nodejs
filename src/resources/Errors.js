var TypedError = require('error/typed')

let ApiServerError = TypedError({
  type: 'API Server Error',
  message: '{title} server error, status={statusCode}',
  title: null,
  statusCode: null
})

module.exports.BadRequest = ApiServerError({
  title: 'Bad Request',
  statusCode: 400
})

module.exports.Unauthorized = ApiServerError({
  title: 'Unauthorized',
  statusCode: 401
})

module.exports.TransactionError = ApiServerError({
  title: 'Transaction Error',
  statusCode: 403
})

module.exports.NotFound = ApiServerError({
  title: 'Not Found',
  statusCode: 404
})

module.exports.PreconditionFailed = ApiServerError({
  title: 'Precondition Failed',
  statusCode: 412
})

module.exports.UnexpectedError = ApiServerError({
  title: 'Internal Server Error',
  statusCode: 512
})
