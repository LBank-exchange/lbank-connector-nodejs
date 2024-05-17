const WebSocketModuleBase = require('./WebSocketModuleBase')
const { validateRequiredParameters } = require('../../utils/validation')

class Trade extends WebSocketModuleBase {
  /**
   * Update subscribed orders, Such events will be pushed when there are new orders created, new orders dealed or new status changes of the account.
   * @param {Object} params Parameters
   * @param {string} params.action Action requested:subscribe,unsubscribe
   * @param {string} params.subscribeKey Obtained through the REST interface of the /v2/subscribe/refresh_key.do
   * @param {string} params.pair Trading pair :eth_btc. Support matching all: all
   */
  orderUpdate (params) {
    validateRequiredParameters({
      action: params.action,
      subscribeKey: params.subscribeKey,
      pair: params.pair
    })
    this.sendMessage({
      subscribe: 'orderUpdate',
      ...params
    })
  }
}

module.exports = Trade
