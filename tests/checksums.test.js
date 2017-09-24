import test from 'ava'
import { gateway, transaction, transactionWithBilling } from './shared'

test('create checksum', async t => {
  const result = await gateway.checksums.create(transaction)
  t.is(result.type, 'paypal')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

test('create checksum for paypal', async t => {
  var test = Object.assign({}, transactionWithBilling)
  delete test.checksum_type

  const result = await gateway.checksums.create(test).forPaypal()
  t.is(result.type, 'paypal')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
})

/*
test('create checksum for sofort', async t => {
  var test = Object.assign({}, transactionWithBilling)
  delete test.checksum_type
  const result = await gateway.checksums.create(transaction).forSofort()
  t.is(result.type, 'sofort')
  t.is(result.action, 'transaction')
  t.true(result.hasOwnProperty('checksum'))
  t.true(result.hasOwnProperty('id'))
}) */

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
  var test = Object.assign({}, transaction)

  delete test.amount
  try {
    const content = await gateway.checksums.create(test)
    t.fail()
  } catch (error) {
    t.regex(error.title, /Precondition/)
  }
})
