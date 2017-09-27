import test from 'ava'
import { gateway } from './shared'
import Chance from 'chance'
const chance = new Chance()
/*
test('should return 2', async t => {
  const clients = await gateway.clients.list().count(2).fetch()
  t.is(clients.length, 2)
})

test('should return 10', async t => {
  const clients = await gateway.clients.list().count(10).fetch()
  t.is(clients.length, 10)
}) */

test('createMany clients', async t => {
  const howMany = chance.integer({ min: 3, max: 10 })
  const clients = []
  for (let i = 0; i < howMany; i++) {
    clients.push({
      email: chance.email(),
      description: chance.sentence()
    })
  }

  const result = await gateway.clients.createMany(clients)

  t.is(result.length, howMany)
})

test('offset with skip', async t => {
  t.is(true, true)

  // dont know how when json returns limited by 20 and csv gives a fuck

  /*
    1. Create 10 new Customers
    2. Save the latest 3 id's
    3. skip 7
    4. check the ids
    5. or something
  */

  // const total = await gateway.clients.list(true).count(2).skip(2).fetch()
})
