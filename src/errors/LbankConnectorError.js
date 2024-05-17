class LbankConnectorError extends Error {
  constructor (message) {
    super(message)
    this.name = 'LbankConnectorError'
  }
}

module.exports = LbankConnectorError
