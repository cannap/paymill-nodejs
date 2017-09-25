import test from 'ava'
import { gateway, isArray } from './shared'
import { createToken } from './shared'
var detect = require('detect-csv')
test('create', async t => {
  const { body } = await createToken()

  const regex = /uniqueId":"(.+)"},"account"/gm
  var match = regex.exec(body)
  const token = match[1]
  const payment = await gateway.payments.create({
    token
  })
  t.regex(payment.id, /pay_/)
})

test('details as object', async t => {
  const payments = await gateway.payments.list().fetch()
  t.is(isArray(payments), true)
})

test('details as csv', async t => {
  const payments = await gateway.payments.list(true).fetch()
  const isCsv = !!detect(payments)
  t.is(isCsv, true)
})
