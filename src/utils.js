exports.generateAuthString = function (key, password = '') {
  var authString = key + ':' + (password || '')
  return Buffer.from(authString || '', 'utf8').toString('base64')
}
