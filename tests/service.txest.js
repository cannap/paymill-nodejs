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

test('offset(skip)', t => {
  // dont know how when json returns limited by 20 and csv gives a fuck

  /*
    1. Create 10 new Customers
    2. Save the latest 3 id's
    3. skip 7
    4. check the ids
    5. or something
  */

  var promises = []
  for (let i = 0; i < 12; i++) {
    promises.push(
      gateway.clients.create({
        description: 'yo',
        email: chance.email()
      })
    )
  }

  // promises.map(function())

  Promise.all(promises)
    .then(res => {
      console.log(promises.length)
    })
    .catch(er => {
      t.log(promises)
    })

  // const total = await gateway.clients.list(true).count(2).skip(2).fetch()
  /*
//client_69e86f52f89a0ce3ae52

//client_f5d5e2a1a7962b06e48a
  */
  /* console.log(total)
  console.log(total.length) */
})
