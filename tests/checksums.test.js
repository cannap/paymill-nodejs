import test from 'ava'
import { gateway, transaction, transactionWithBilling } from './shared'

test('create checksum', async t => {
  const result = await gateway.checksums.create(transaction)
  t.is(result.type, 'paypal')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

test('create checksum with billing address', async t => {
  try {
    const result = await gateway.checksums.create(transactionWithBilling)
    t.is(result.type, 'paypal')
    t.is(result.action, 'transaction')
    t.true(result.hasOwnProperty('checksum'))
    t.true(result.hasOwnProperty('id'))
    t.regex(result.data, /billing/)
  } catch (error) {
    t.fail(error)
  }
})

test('create checksum with shipping as billing address', async t => {
  try {
    const result = await gateway.checksums.create(transactionWithBilling, true)
    t.is(result.type, 'paypal')
    t.is(result.action, 'transaction')
    t.true(result.hasOwnProperty('checksum'))
    t.true(result.hasOwnProperty('id'))
    t.regex(result.data, /shipping/)
  } catch (error) {
    t.fail(error)
  }
})

test('create checksum error with missing field', async t => {
  delete transaction.checksum_type
  try {
    await gateway.checksums.create(transaction)
    t.fail()
  } catch (error) {
    console.log(error)
    // t.is('Parameter is mandatory', error.messages.required)
  }
})
