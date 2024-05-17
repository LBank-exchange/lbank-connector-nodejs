const APIBase = require('../../APIBase')
const { HttpMethod } = require('../../constants')

/**
 * WebSocket API（Asset & Order）
 */
class Subscribe extends APIBase {
  /**
   * Create subscribeKey. The key is valid in 60 minutes from creation.
   */
  getKey () {
    return this.sendSignRequest(HttpMethod.POST, '/v2/subscribe/get_key.do')
  }

  /**
   * Extend the validity of subscribeKey. The key is valid in 60 minutes from this call.
   * @param {Object} params Parameters
   * @param {string} params.subscribeKey subscribeKey
   */
  refreshKey (params) {
    return this.sendSignRequest(HttpMethod.POST, '/v2/subscribe/refresh_key.do', params)
  }

  /**
   * Close the data stream for an account.
   * @param {Object} params Parameters
   * @param {string} params.subscribeKey subscribeKey
   */
  destroyKey (params) {
    return this.sendSignRequest(HttpMethod.POST, '/v2/subscribe/destroy_key.do', params)
  }
}

module.exports = Subscribe
