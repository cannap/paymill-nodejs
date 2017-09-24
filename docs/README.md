# Paymill Api for Nodejs
Simple Api for Paymill
## Installation
`` npm install paymill-nodejs ``

or

`` yarn add paymill-nodejs ``
### Authentication
```js
const paymill = require('paymill-nodejs')
const pm = paymill.init({
  authKey: '78a89e6426abe79f820566c0ca0e128f'
})

``` 
## Checksums
### Create
Creates a new Checksum

| Param                | Type   |
|----------------------|--------|
| data                 | Object |
| useBillingAsShipping | Bool   |

```js
const result = await pm.checksums.create({
  amount: 100,
  currency: 'eur',
  checksum_type: 'paypal',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry')
})
```
For Paypal:
```js
const result = await pm.checksums.create({
  amount: 100,
  currency: 'eur',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry')
}).forPaypal()

```
For Sofort:
```js
const result = await pm.checksums.create({
  amount: 100,
  currency: 'eur',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry')
}).forSofort()
```


### List