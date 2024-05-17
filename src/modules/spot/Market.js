const APIBase = require('../../APIBase')
const { HttpMethod } = require('../../constants')
const { validateRequiredParameters } = require('../../utils/validation')

/**
 * Market Data Endpoints
 */
class Market extends APIBase {
  /**
   * Test whether the Rest API can be connected.
   */
  ping () {
    return this.sendPublicRequest(
      HttpMethod.POST,
      '/v2/supplement/system_ping.do'
    )
  }

  /**
   * Available trading pairs
   */
  currencyPairs () {
    return this.sendPublicRequest(HttpMethod.GET, '/v2/currencyPairs.do')
  }

  /**
   * Acquiring the basic information of all trading pairs
   */
  accuracy () {
    return this.sendPublicRequest(HttpMethod.GET, '/v2/accuracy.do')
  }

  /**
   * Get withdrawal configurations
   * @param {Object} [params] Parameters
   * @param {string} [params.assetCode] Code of the asset
   */
  withdrawConfigs (params) {
    return this.sendPublicRequest(
      HttpMethod.GET,
      '/v2/withdrawConfigs.do',
      params
    )
  }

  /**
   * 获取美元对人民币的兑换比例
   */
  // usdToCny () {
  //   return this.sendPublicRequest(HttpMethod.GET, '/v2/usdToCny.do')
  // }

  /**
   * Get timestamp
   */
  timestamp () {
    return this.sendPublicRequest(HttpMethod.GET, '/v2/timestamp.do')
  }

  /**
   * Get depth information
   * @param {Object} params request parameters
   * @param {string} params.symbol Trading Pair.
   * @param {number} params.size The count of returned items.(1-200)
   */
  depth (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      size: params.size
    })
    return this.sendPublicRequest(HttpMethod.GET, '/v2/depth.do', params)
  }

  /**
   * Get the latest price of the trading pair
   * @param {Object} [params] request parameters
   * @param {string} [params.symbol] Pair
   */
  price (params) {
    return this.sendPublicRequest(
      HttpMethod.GET,
      '/v2/supplement/ticker/price.do',
      params
    )
  }

  /**
   * Symbol Order Book Ticker
   * The current optimal pending order
   * @param {Object} params request parameters
   * @param {string} params.symbol coin pair
   */
  bookTicker (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendPublicRequest(
      HttpMethod.GET,
      '/v2/supplement/ticker/bookTicker.do',
      params
    )
  }

  /**
   * 24hr Ticker
   * GET the LBank coin quote data, excluding Leveraged Tokens trading pairs (get Leveraged Tokens trading pairs GET /v2/etfTicker/24hr.do)
   * @param {Object} params request parameters
   * @param {string} params.symbol Pair. Such as: eth_btc、zec_btc、 all
   */
  ticker24h (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendPublicRequest(HttpMethod.GET, '/v2/ticker/24hr.do', params)
  }

  /**
   * Leveraged Tokens 24hr Ticker
   * Get LBank Leveraged Tokens market data
   * @param {Object} params request parameters
   * @param {string} params.symbol Pair. Such as: btc3l_usdt、all
   */
  etfTicker24hr (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendPublicRequest(
      HttpMethod.GET,
      '/v2/etfTicker/24hr.do',
      params
    )
  }

  /**
   * 获取LBank市场深度，这是带版本号的根据增量合并起来的深度
   * @param {Object} params request parameters
   * @param {string} params.symbol 币对如 btc_usdt
   */
  // incrDepth (params) {
  //   return this.sendPublicRequest(HttpMethod.GET, '/v2/incrDepth.do', params)
  // }

  /**
   * Recent transactions list
   * List of recent transactions
   * @param {Object} params request parameters
   * @param {string} params.symbol coin pair
   * @param {string} params.size Returns size
   * @param {string} [params.time] Returns size pieces of data after the timestamp, if empty, returns the latest size pieces of data
   */
  trades (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      size: params.size
    })
    return this.sendPublicRequest(
      HttpMethod.GET,
      '/v2/supplement/trades.do',
      params
    )
  }

  /**
   * Query K Bar Data
   * @param {Object} params request parameters
   * @param {string} params.symbol Trading Pair. Such as: eth_btc
   * @param {string} params.type minute1: 1 minute
        minute5: 5 minutes
        minute15: 15minutes
        minute30: 30 minutes
        hour1: 1 hour
        hour4: 4 hours
        hour8: 8 hours
        hour12: 12 hours
        day1: 1 day
        week1: 1 week
        month1: 1 month
   * @param {number} params.size Count of the bars (1-2000)
   * @param {string|number} params.time Timestamp (of Seconds)
   */
  kline (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      size: params.size,
      type: params.type,
      time: params.time
    })
    return this.sendPublicRequest(HttpMethod.GET, '/v2/kline.do', params)
  }
}

module.exports = Market
