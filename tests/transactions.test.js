import test from 'ava'

import { createToken } from './shared'

test('Create Transaction', async t => {
  const { body } = await createToken()
  const regex = /uniqueId":"(.+)"},"account"/gm
  var match = regex.exec(body)
  const token = match[1]
  t.is(token, token)
})
