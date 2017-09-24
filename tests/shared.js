const paymill = require('../src')
const got = require('got')
const authKey = '78a89e6426abe79f820566c0ca0e128f'
const publicKey = '401976168758fc2639ec889ef2912f6d'

module.exports.authKey = authKey
module.exports.publickKey = publicKey

module.exports.gateway = paymill.init({
  authKey: '78a89e6426abe79f820566c0ca0e128f'
})

module.exports.defaultToken = '098f6bcd4621d373cade4e832627b4f6'

module.exports.transaction = {
  amount: 100,
  currency: 'eur',
  checksum_type: 'paypal',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry'
}

exports.createToken = async function () {
  const url =
    'https://test-token.paymill.de/?transaction.mode=CONNECTOR_TEST&channel.id=401976168758fc2639ec889ef2912f6d&response.url=https%3A%2F%2Ftest-tds.paymill.de%2Fend.php%3FparentUrl%3Dhttp%25253A%25252F%25252Flocalhost%25253A8080%25252F%26&jsonPFunction=window.paymill.transport.paymillCallback4138906770&account.number=4111111111111111&account.expiry.month=12&account.expiry.year=2222&account.verification=222&account.holder=fewf%20fwefef&account.email=test%40customer.com&presentation.amount3D=42.00&presentation.currency3D=EUR'

  return got(url)
}

module.exports.transactionWithBilling = {
  amount: 10,
  currency: 'EUR',
  checksum_type: 'paypal',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry',
  billing_address: {
    name: 'Max Mustermann',
    street_address: 'Musterstr. 1',
    city: 'Munich',
    state: 'Bavaria',
    postal_code: '80333',
    country: 'DE'
  }
}
