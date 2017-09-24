const client = require('https')
const qs = require('qs')
const { generateAuthString } = require('../utils')
const Buffer = require('buffer').Buffer
const errors = require('./Errors')

class Http {
  constructor (config) {
    this.config = config

    this.headers = {
      Authorization: `Basic ${generateAuthString(this.config.authKey)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  httpStatusCheck (status) {
    // Todo: when growing move in other file
    switch (status.toString()) {
      case '400':
        return errors.BadRequest
      case '401':
        return errors.Unauthorized
      case '403':
        return errors.TransactionError
      case '404':
        return errors.NotFound
      case '412':
        return errors.PreconditionFailed
      case '512':
        return errors.UnexpectedError
    }
  }

  /**
   *
   * @param {Object} request -  Request Object
   * @param {Object} request.url Request URL
   * @param {Object} request.body Request body
   * @param {Object} json Request body
   * @param {headers} body
   */
  post (request, headers) {
    return this._request('POST', request, headers)
  }
  /**
   *
   * @param {Object} request -  Request Object
   * @param {Object} request.url Request URL
   * @param {Object} request.body Request body
   * @param {Object} json Request body
   * @param {headers} body
   */
  get (request, headers) {
    return this._request('GET', request, headers)
  }
  /**
   *
   * @param {Object} request -  Request Object
   * @param {Object} request.url Request URL
   * @param {Object} request.body Request body
   * @param {Object} json Request body
   * @param {headers} body
   */
  delete (request, headers) {
    return this._request('DELETE', request, headers)
  }
  /**
   *
   * @param {Object} request -  Request Object
   * @param {Object} request.url Request URL *
   * @param {Object} request.body Request body*
   * @param {Object} json Request body
   * @param {headers} body
   */
  put (request, headers) {
    return this._request('PUT', request, headers)
  }

  _request (method, request, headers) {
    var jsonOutput = !(typeof request.json !== 'undefined')

    var tempHeader = Object.assign({}, this.headers)
    tempHeader = Object.assign(tempHeader, headers)

    jsonOutput || delete tempHeader['Content-Type']

    const requestBody = qs.stringify(request.body, { encode: false })

    const options = {
      headers: tempHeader,
      method,
      port: 443,
      host: this.config.host,
      path: `/${this.config.version}/${request.url}`
    }

    if (request.body) {
      options['Content-Length'] = Buffer.byteLength(requestBody).toString()
    }
    return new Promise((resolve, reject) => {
      const theRequest = client.request(options, response => {
        let chunks = []
        response.on('data', responseBody => {
          chunks.push(responseBody)
        })
        response.on('end', () => {
          const buffer = Buffer.concat(chunks)
          const statusCode = response.statusCode
          let finalResponse
          if (jsonOutput) {
            try {
              finalResponse = JSON.parse(buffer.toString('utf-8')).data
            } catch (err) {}
          } else {
            finalResponse = buffer.toString('utf-8')
          }
          const error = this.httpStatusCheck(statusCode)
          if (error) {
            reject(error)
          }

          resolve(finalResponse)
        })

        response.on('error', err => {
          reject(err)
        })
      })

      if (request.body) {
        theRequest.write(requestBody)
      }
      theRequest.end()
    })
  }
}

module.exports = Http
