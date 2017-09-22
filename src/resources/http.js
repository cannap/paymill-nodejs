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
        return exceptions('Unauthorized')
      case '403':
        return exceptions('Transaction Error')
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
    this._request('GET', url)
  }
  delete (url) {
    this._request('DELETE', url)
  }

  _request (method, url, body = false) {
    const requestBody = qs.stringify(body, { encode: false })
    let options = {
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
          let buffer = Buffer.concat(chunks)
          let finalResponse = JSON.parse(buffer.toString('utf-8'))
          let error = this.httpStatusCheck(response.statusCode)
          console.log(response.statusCode)

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
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

module.exports = Http
