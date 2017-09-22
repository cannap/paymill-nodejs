import Http from '../src/resources/http'
import test from 'ava'
import { authKey } from './shared'

const defaultConfig = {
  host: 'api.paymill.com',
  version: 'v2.1',
  authKey
}

const http = new Http(defaultConfig)

test('http get', async t => {
  try {
    const result = await http.get('clients')
    t.regex(result[0]['id'], /client/)
  } catch (error) {
    t.fail('cant load resposne')
  }
})

test('http post', async t => {
  try {
    const result = await http.post('clients', {
      email: 'emaile@mail.com',
      description: 'never pays his bills'
    })
    t.is(result.email, 'emaile@mail.com')
  } catch (error) {
    t.fail('Post request failed')
  }
})

test('http delete', async t => {
  const client = await http.post('clients', {
    email: 'emaile@mail.com',
    description: 'never pays his bills'
  })
  const result = await http.delete(`clients/${client.id}`)
  t.is(result, null)
})

test('http put', async t => {
  const client = await http.post('clients', {
    email: 'emaile@mail.com',
    description: 'never pays his bills'
  })

  const updatedClient = await http.put(`clients/${client.id}`, {
    email: 'new@email.com'
  })
  t.is(updatedClient.email, 'new@email.com')
})