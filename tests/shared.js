const paymill = require('../src')

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

module.exports.transactionWithBilling = {
  amount: 100,
  currency: 'eur',
  checksum_type: 'paypal',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry',
  billing_address: {
    name: 'Max Mustermann',
    street_address: 'Musterstr. 1',
    street_address_addition: 'nothibng',
    city: 'Munich',
    state: 'Bavaria',
    postal_code: '80333',
    country: 'DE',
    phone: '+4989123456'
  }
}
