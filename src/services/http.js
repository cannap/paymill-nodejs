const client = require('https')
const qs = require('qs')
const generateAuthString = require('../utils').generateAuthString
const Buffer = require('buffer').Buffer
const { UnexpectedError, HttpError } = require('./Errors')
// Todo: timeout
class Http {
  constructor (config) {
    this.config = config
    this.headers = {
      Authorization: `Basic ${generateAuthString(this.config.authKey)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  httpStatusCheck (status, message) {
    switch (status.toString()) {
      case '400':
        return new HttpError(400, 'Bad Request', message)
      case '401':
        return new HttpError(401, 'Unauthorized')
      case '403':
        return new HttpError(402, 'Transaction Error')
      case '404':
        return new HttpError(404, 'Not Found')
      case '412':
        return new HttpError(412, message)
      case '512':
        return new UnexpectedError(512, 'Internal Server Error', message)
    }
  }

  /**
   *
   * @param {Object} request -  Request Object
   * @param {String} request.url Request URL
   * @param {Object} request.body Request body
   * @param {Boolean} json Request body
   * @param {Object} headers
   */
  post (request, headers) {
    return this._request('POST', request, headers)
  }
  /**
   *
   * @param {Object} request -  Request Object
   * @param {String} request.url Request URL
   * @param {Object} request.body Request body
   * @param {Boolean} json Request body
   * @param {Object} headers
   */
  get (request, headers) {
    return this._request('GET', request, headers)
  }
  /**
   *
   * @param {Object} request -  Request Object
   * @param {String} request.url Request URL
   * @param {Object} request.body Request body
   * @param {Boolean} request.json Request body
   * @param {Object} headers
   */
  delete (request, headers) {
    return this._request('DELETE', request, headers)
  }
  /**
   *
   * @param {Object} request -  Request Object
   * @param {String} request.url Request URL *
   * @param {Object} request.body Request body*
   * @param {Boolean} json Request body
   * @param {Object} headers
   */
  put (request, headers) {
    return this._request('PUT', request, headers)
  }

  _request (method, request) {
    var jsonOutput = true
    // Todo find a beter solution
    var tempHeader = Object.assign({}, this.headers)
    tempHeader = Object.assign(tempHeader, request.headers)

    if (typeof request.json !== 'undefined') {
      jsonOutput = request.json
      delete tempHeader['Content-Type']
    }

    const requestBody = qs.stringify(request.body, { encode: false })

    const options = {
      headers: tempHeader,
      method,
      port: 443,
      host: this.config.host,
      path: `/${this.config.version}/${request.url}/?${method === 'GET' &&
      request.body
        ? requestBody
        : ''}`
    }

    if (request.body) {
      options['Content-Length'] = Buffer.byteLength(requestBody).toString()
    }
    return new Promise((resolve, reject) => {
      var errorFromResponse = false
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
            } catch (err) {
              errorFromResponse = new UnexpectedError('Invalid JSON format')
            }
          } else {
            finalResponse = buffer.toString('utf-8')
          }
          if (statusCode !== 200 || errorFromResponse) {
            try {
              errorFromResponse = this.httpStatusCheck(
                statusCode,
                JSON.parse(buffer.toString('utf-8'))
              )
            } catch (error) {
              errorFromResponse = this.httpStatusCheck(
                statusCode,
                buffer.toString('utf-8')
              )
            }

            finalResponse = null
            reject(errorFromResponse)
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
