const WebSocketModuleBase = require('./WebSocketModuleBase')
const { validateRequiredParameters } = require('../../utils/validation')

class Market extends WebSocketModuleBase {
  /**
   * Subscription of K-line Data
   * @param {Object} params Parameters
   * @param {string} params.action Action requested:subscribe,unsubscribe
   * @param {string} params.kbar To subscribe to k-line types, 1min: 1 minute, 5min: 5 minutes, 15min: 15 minutes, 30min: 30 minutes, 1hr: 1 hour, 4hr: 4 hours, day: 1 day, week: 1 week, month: 1 month, year: 1 year
   * @param {string} params.pair Trading pair:eth_btc
   */
  kbar (params) {
    validateRequiredParameters({
      action: params.action,
      kbar: params.kbar,
      pair: params.pair
    })

    this.sendMessage({
      subscribe: 'kbar',
      ...params
    })
  }

  /**
   * Market Depth
   * @param {Object} params Parameters
   * @param {string} params.action Type of action requested:subscribe,unsubscribe
   * @param {string} params.depth Pro-choise:10/50/100
   * @param {string} params.pair Trading pair:eth_btc
   */
  depth (params) {
    validateRequiredParameters({
      action: params.action,
      depth: params.depth,
      pair: params.pair
    })

    this.sendMessage({
      subscribe: 'depth',
      ...params
    })
  }

  /**
   * Market
   * @param {Object} params Parameters
   * @param {string} params.action Action requested:subscribe,unsubscribe
   * @param {string} params.pair Trading pair:eth_btc
   */
  tick (params) {
    validateRequiredParameters({
      action: params.action,
      pair: params.pair
    })
    this.sendMessage({
      subscribe: 'tick',
      ...params
    })
  }

  /**
   * Trade record
   * @param {Object} params Parameters
   * @param {string} params.action Action requested: subscribe or unsubscribe
   * @param {string} params.pair Trading pair:eth_btc
   */
  trade (params) {
    validateRequiredParameters({
      action: params.action,
      pair: params.pair
    })
    this.sendMessage({
      subscribe: 'trade',
      ...params
    })
  }
}

module.exports = Market
