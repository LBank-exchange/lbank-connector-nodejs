const WebSocketModuleBase = require('./WebSocketModuleBase')
const { validateRequiredParameters } = require('../../utils/validation')

class Account extends WebSocketModuleBase {
  /**
   * Update subscribed asset, Such events will be pushed when the balance of assets under the account changes (increase, deduction, available freeze, freeze release).
   * @param {Object} params Parameters
   * @param {string} params.action Action requested:subscribe,unsubscribe
   * @param {string} params.subscribeKey Obtained through the REST interface of the /v2/subscribe/refresh_key.do
   */
  assetUpdate (params) {
    validateRequiredParameters({
      action: params.action,
      subscribeKey: params.subscribeKey
    })
    this.sendMessage({
      subscribe: 'assetUpdate',
      ...params
    })
  }
}

module.exports = Account
