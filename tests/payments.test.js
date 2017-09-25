import test from 'ava'
import { gateway } from './shared'
import { createToken } from './shared'
var detect = require('detect-csv')
test('create', async t => {
  const { body } = await createToken()

  const regex = /uniqueId":"(.+)"},"account"/gm
  var match = regex.exec(body)
  const token = match[1]
  console.log(token)
  const payment = await gateway.payments.create({
    token
  })
  t.regex(payment.id, /pay_/)
})

test('details as object', async t => {
  const payments = await gateway.payments.list()

  t.is(isArray(payments), true)
})

test('details as csv', async t => {
  const payments = await gateway.payments.list(true)
  const isCsv = !!detect(payments)
  t.is(isCsv, true)
})

function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
