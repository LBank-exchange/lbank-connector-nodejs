const { ErrorCode } = require('../constants')

class LbankClientError extends Error {
  constructor (errorCode, response) {
    const message = ErrorCode[errorCode] || errorCode
    super(message)
    this.name = 'LbankClientError'
    this.errorCode = errorCode
    this.data = response.data
    this.httpStatusCode = response.status
    this.path = response.request?.path
  }
}

module.exports = LbankClientError
