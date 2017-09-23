import test from 'ava'

import { createToken } from './shared'

test('Create Transactio', async t => {
  const { body } = await createToken()
  const regex = /uniqueId":"(.+)"},"account"/gm
  var match = regex.exec(body)
  const token = match[1]
  console.log(token)
})
