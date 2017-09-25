'use strict'
import test from 'ava'
import { gateway } from './shared'
import Chance from 'chance'
var detect = require('detect-csv')
const chance = new Chance()

test('create', async t => {
  const email = chance.email()
  const client = await gateway.clients.create({
    email,
    description: 'Some description'
  })
  t.is(client.email, email)
})

test('update', async t => {
  const email = chance.email()
  const email2 = chance.email()
  const client = await gateway.clients.create({
    email,
    description: 'Some description'
  })

  const updatedClient = await gateway.clients.update(client.id, {
    email: email2,
    description: 'New Descriptio'
  })
  t.is(updatedClient.email, email2)
})

test('details', async t => {
  const email = chance.email()
  const client = await gateway.clients.create({
    email: email,
    description: 'Some description'
  })

  const clientDetails = await gateway.clients.details(client.id)

  t.is(clientDetails.email, email)
})

test('delete', async t => {
  const email = chance.email()
  const client = await gateway.clients.create({
    email: email,
    description: 'Some description'
  })

  const result = await gateway.clients.remove(client.id)
  t.is(result, null)
})

test('export as csv', async t => {
  const exportedClient = await gateway.clients.list(true)
  var isCsv = !!detect(exportedClient)
  console.log(isCsv)
  t.is(isCsv, true)
})

test('list as object', async t => {
  const exportedClient = await gateway.clients.list()
  t.is(typeof exportedClient, 'object')
})
//
