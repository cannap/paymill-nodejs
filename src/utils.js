exports.generateAuthString = function (key, password = '') {
  var authString = key + ':' + (password || '')
  return Buffer.from(authString || '', 'utf8').toString('base64')
}

exports.createToken = function () {
  function getTokenUrl () {
    return (
      'https://test-token.paymill.com/?transaction.mode=CONNECTOR_TEST&channel.id=' +
      publicKey +
      '&jsonPFunction=paymilljstests&account.number=4111111111111111&account.expiry.month=12&account.expiry.year=2015&account.verification=123&account.holder=Max%20Mustermann&presentation.amount3D=&presentation.currency3D='
    )
  }
}
