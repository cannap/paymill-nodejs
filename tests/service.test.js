import test from 'ava'
import { gateway } from './shared'

test('should return 2', async t => {
  const clients = await gateway.clients.list().count(2).fetch()
  t.is(clients.length, 2)
})

test('should return 10', async t => {
  const clients = await gateway.clients.list().count(10).fetch()
  t.is(clients.length, 10)
})
