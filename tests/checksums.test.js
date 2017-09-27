import test from 'ava'
import { gateway, transaction, transactionWithBilling } from './shared'

test('create', async t => {
  const result = await gateway.checksums.create(transaction)
  t.is(result.type, 'paypal')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

test('create for paypal', async t => {
  var testData = Object.assign({}, transactionWithBilling)
  delete testData.checksum_type
  const result = await gateway.checksums.create(testData).forPaypal()
  t.is(result.type, 'paypal')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

test('create checksum for sofort', async t => {
  var testData = Object.assign({}, transactionWithBilling)
  delete testData.checksum_type

  testData.customer_email = 'hello@example.com'
  const result = await gateway.checksums.create(testData).forSofort()

  t.is(result.type, 'sofort')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

test('create with billing address', async t => {
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

test('create with shipping as billing address', async t => {
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

test('create error with missing field', async t => {
  var test = Object.assign({}, transaction)
  delete test.amount
  try {
    await gateway.checksums.create(test)
    t.fail()
  } catch (error) {
    t.is(error.status, 412)
  }
})
