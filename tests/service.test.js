import test from 'ava'
import { gateway } from './shared'
import Chance from 'chance'
const chance = new Chance()

test('count', async t => {
  const clients = await gateway.clients.list().count(2).fetch()

  const clientsMore = await gateway.clients.list().count(10).fetch()

  t.is(clients.length, 2)
  t.is(clientsMore.length, 10)
})

test('create many', async t => {
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

test('remove many, async', async t => {
  const howMany = chance.integer({ min: 3, max: 10 })
  const clients = []
  for (let i = 0; i < howMany; i++) {
    clients.push({
      email: chance.email(),
      description: chance.sentence()
    })
  }

  const results = await gateway.clients.createMany(clients)
  const deleted = await gateway.clients.removeMany(
    results.map(result => result.id),
    4
  )

  t.is(deleted.length, howMany)
})

/* test('offset with skip', async t => {
  t.is(true, true)

  // dont know how when json returns limited by 20 and csv gives a fuck

    1. Create 10 new Customers
    2. Save the latest 3 id's
    3. skip 7
    4. check the ids
    5. or something

  // const total = await gateway.clients.list(true).count(2).skip(2).fetch()
})
*/
