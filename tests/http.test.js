import Http from '../src/services/http'
import test from 'ava'
import { authKey } from './shared'

const defaultConfig = {
  host: 'api.paymill.com',
  version: 'v2.1',
  authKey
}

const http = new Http(defaultConfig)

test('get', async t => {
  try {
    const result = await http.get({ url: 'clients' })
    t.log(result)
    t.regex(result[0]['id'], /client/)
  } catch (error) {
    t.fail('cant load response')
  }
})

test('post', async t => {
  try {
    const result = await http.post({
      url: 'clients',
      body: {
        email: 'emaile@mail.com',
        description: 'never pays his bills'
      }
    })
    t.is(result.email, 'emaile@mail.com')
  } catch (error) {
    t.fail('Post request failed')
  }
})

test('http delete', async t => {
  const client = await http.post({
    url: 'clients',
    body: {
      email: 'emaile@mail.com',
      description: 'never pays his bills'
    }
  })
  const result = await http.delete({ url: `clients/${client.id}` })
  t.is(result, null)
})

test('put', async t => {
  const client = await http.post({
    url: 'clients',
    body: {
      email: 'emaile@mail.com',
      description: 'never pays his bills'
    }
  })

  const updatedClient = await http.put({
    url: `clients/${client.id}`,
    body: { email: 'new@email.com' }
  })
  t.is(updatedClient.email, 'new@email.com')
})

test('HTTP ERROR', t => {
  const error = http.httpStatusCheck(404)

  t.is(error.status, 404)
})
