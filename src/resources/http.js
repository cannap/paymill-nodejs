const client = require('https')
const qs = require('qs')
const { generateAuthString } = require('../utils')
const Buffer = require('buffer').Buffer
const exceptions = require('./exceptions')

class Http {
  constructor (config) {
    this.config = config
  }

  httpStatusCheck (status) {
    // Todo: when growing move in other file
    switch (status.toString()) {
      case '400':
        return exceptions.BadRequest('Bad Request')
      case '401':
        return exceptions.Unauthorized('Unauthorized')
      case '403':
        return exceptions.TransactionError('Transaction Error')
      case '404':
        return exceptions.NotFound('Not Found')
      case '412':
        return exceptions.PreconditionFailed('Precondition Failed')
      case '512':
        return exceptions.UnexpectedError('Internal Server Error')
    }
  }

  post (url, body) {
    return this._request('POST', url, body)
  }
  get (url) {
    return this._request('GET', url)
  }
  delete (url) {
    return this._request('DELETE', url)
  }
  put (url, body) {
    return this._request('PUT', url, body)
  }

  _request (method, url, body = false) {
    const requestBody = qs.stringify(body, { encode: false })
    const options = {
      headers: this._headers(),
      method,
      port: 443,
      host: this.config.host,
      path: `/${this.config.version}/${url}`
    }

    if (body) {
      options['Content-Length'] = Buffer.byteLength(requestBody).toString()
    }

    return new Promise((resolve, reject) => {
      const request = client.request(options, response => {
        let chunks = []
        response.on('data', responseBody => {
          chunks.push(responseBody)
        })

        response.on('end', () => {
          const buffer = Buffer.concat(chunks)
          const finalResponse = JSON.parse(buffer.toString('utf-8'))
          const error = this.httpStatusCheck(response.statusCode)

          if (error) {
            reject(finalResponse.error)
            return
          }
          resolve(finalResponse.data)
        })

        response.on('error', err => {
          reject(err)
        })
      })

      if (body) {
        request.write(requestBody)
      }
      request.end()
    })
  }

  _headers () {
    return {
      Authorization: `Basic ${generateAuthString(this.config.authKey)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/csv'
    }
  }
}

module.exports = Http
