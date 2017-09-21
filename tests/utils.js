import test from 'ava'
// { generateAuthString } from '../src/utils'
var utils = require('../src/utils')
test('generate base64 auth string', t => {
  const authString = utils.generateAuthString(
    '78a89e6426abe79f820566c0ca0e128f'
  )
  t.is(authString, 'NzhhODllNjQyNmFiZTc5ZjgyMDU2NmMwY2EwZTEyOGY6')
})
