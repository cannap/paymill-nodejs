/* const data = {
  amount: 100,
  currency: 'eur',
  checksum_type: 'paypal',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry'
} */
import test from 'ava'
import { gateway } from './shared'

const data = {
  amount: 100,
  currency: 'eur',
  checksum_type: 'paypal',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry'
}

test('create checksum', async t => {
  const result = await gateway.checksums.create(data)
  t.is(result.type, 'paypal')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

test('create checksum error with missing field', async t => {
  delete data.checksum_type
  try {
    await gateway.checksums.create(data)
    t.fail()
  } catch (error) {
    t.is('Parameter is mandatory', error.messages.required)
  }
})
