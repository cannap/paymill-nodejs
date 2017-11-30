# Paymill Api for Nodejs
Simple API Wrapper for Paymill
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
<p class="tip">
[**Official API Reference**](https://developers.paymill.com/API/index#checksums)
</p>

#### Create
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
##### Paypal

Creates a Paypal Checksum
<p class="warning">
[Paypal Guide](https://developers.paymill.com/guides/paypal/how-to-set-up-paypal.html)
</p>

```js
const result = await pm.checksums.create({
  amount: 100,
  currency: 'eur',
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry')
}).forPaypal()
```
##### Sofort

Create a Sofort Checksum
<p class="warning">
[Sofort Guide](https://developers.paymill.com/guides/sofort/transactions)
</p>

```js
const result = await pm.checksums.create({
  amount: 10,
  currency: 'EUR',
  customer_email: 'email@example.com', // Not client_email 
  country: 'DE', //
  return_url: 'https://www.example.com/store/checkout/result',
  cancel_url: 'https://www.example.com/store/checkout/retry',
  billing_address: {
    name: 'Max Mustermann',
    street_address: 'Musterstr. 1',
    city: 'Munich',
    state: 'Bavaria',
    postal_code: '80333',
    country: 'DE'
}).forSofort()
```
## Clients
<p class="tip">
[**Official API Reference**](https://developers.paymill.com/API/index?bash#-client-object)
</p>

#### Create 
Create a new Client

```js
const client = await gateway.clients.create({
    email:'client@example.com',
    description: 'Some description'
})
```
#### Details
Get details from a Single Client

| Param    | Type   |
|----------|--------|
| clientid | String |

```js
 const clientDetails = await gateway.clients.details('clientId')
```


#### Update
Update a Single Client

| Param    | Type   |
|----------|--------|
| clientid | String |

```js
 const updatedClient = await gateway.clients.update('clientId', {
    email: 'new-email@example.com',
    description: 'New Description'
  })
```

#### Delete
Delete a Single Client

| Param    | Type   |
|----------|--------|
| clientid | String |

```js
 const updatedClient = await gateway.clients.delete('clientId')
```


#### List
List Clients

| Param    | Type   |
|----------|--------|
| csv | Boolean |

```js
 const updatedClient = await gateway.clients.list(csv = false).fetch()
```






