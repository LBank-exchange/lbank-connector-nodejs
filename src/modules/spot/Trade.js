const APIBase = require('../../APIBase')
const { HttpMethod } = require('../../constants')
const { validateRequiredParameters } = require('../../utils/validation')

/**
 * Spot Trading Endpoints
 */
class Trade extends APIBase {
  /**
   * Test order
   * @param {Object} params request parameters
   * @param {string} params.symbol Transaction pair eth_btc: Ethereum; zec_btc: Zerocoin
   * @param {string} params.type The type of the order, including buy, sell, buy_market, sell_market, buy_maker, sell_maker, buy_ioc, sell_ioc, buy_fok, sell_fok
   * @param {string} params.price Order price Buy and sell orders: greater than or equal to 0
   * @param {string} params.amount Amount of transactions Sell order and sell order: BTC amount is greater than or equal to 0.001
   * @param {string} [params.custom_id] User-defined ID, do not repeat by yourself
   * @param {number} [params.window] Expiration time of order, milliseconds, automatic cancellation of order after timeout (considering the public network time, it is recommended not to exceed 5s)
   */
  createOrderTest (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      type: params.type,
      price: params.price,
      amount: params.amount
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/create_order_test.do',
      params
    )
  }

  /**
   * Create order
   * @param {Object} params request parameters
   * @param {string} params.symbol Transaction pair eth_btc: Ethereum; zec_btc: Zerocoin
   * @param {string} params.type The type of the order, including buy, sell, buy_market, sell_market, buy_maker, sell_maker, buy_ioc, sell_ioc, buy_fok, sell_fok
   * @param {string} params.price Reference description Order price Buy and sell orders: greater than or equal to 0
   * @param {string} params.amount Reference description Amount of transactions Sell order and sell order: BTC amount is greater than or equal to 0.001
   * @param {string} params.sign signature of request parameter
   * @param {string} [params.custom_id] User-defined ID, do not repeat by yourself
   * @param {number} [params.window] Expiration time of order, milliseconds, automatic cancellation of order after timeout (considering the public network time, it is recommended not to exceed 5s)
   */
  createOrder (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      type: params.type,
      price: params.price,
      amount: params.amount
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/create_order.do',
      params
    )
  }

  /**
   * Cancel order
   * @param {Object} params request parameters
   * @param {string} params.symbol coin pair
   * @param {string} [params.orderId] orderid, User-defined id and order id must be passed
   * @param {string} [params.origClientOrderId] User-defined id and order id must be passed
   */
  cancelOrder (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/cancel_order.do',
      params
    )
  }

  /**
   * Cancel order by symbol
   * @param {Object} params request parameters
   * @param {string} params.symbol coin pair
   */
  cancelOrderBySymbol (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/cancel_order_by_symbol.do',
      params
    )
  }

  /**
   * Orders info
   * @param {Object} params
   * @param {string} params.symbol coin pair
   * @param {string} [params.orderId] orderid, User-defined id and order id must be passed
   * @param {string} [params.origClientOrderId] User-defined id and order id must be passed
   */
  ordersInfo (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/orders_info.do',
      params
    )
  }

  /**
   * Current pending order
   * @param {Object} params request parameters
   * @param {string} params.symbol Transaction pair eth_btc: Ethereum; zec_btc: Zerocoin
   * @param {string} params.current_page current page number
   * @param {string} params.page_length Number of data items per page (not less than 1, not more than 200)
   */
  ordersInfoNoDeal (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      current_page: params.current_page,
      page_length: params.page_length
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/orders_info_no_deal.do',
      params
    )
  }

  /**
   * Query all orders
   * @param {Object} params request parameters
   * @param {string} params.symbol Transaction pair eth_btc: Ethereum; zec_btc: Zerocoin
   * @param {string} params.current_page current page number
   * @param {string} params.page_length Number of data items per page (not less than 1, not more than 200)
   * @param {string} [params.status] Order Status
   */
  ordersInfoHistory (params) {
    validateRequiredParameters({
      symbol: params.symbol,
      current_page: params.current_page,
      page_length: params.page_length
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/orders_info_history.do',
      params
    )
  }

  /**
   * Account information
   */
  userInfoAccount () {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/user_info_account.do',
      {}
    )
  }

  /**
   * Historical transaction details
   * @param {Object} params request parameters
   * @param {string} params.symbol Transaction pair eth_btc: Ethereum; zec_btc: Zerocoin
   * @param {string} [params.startTime] Start time yyyy-mm-dd or yyyy-MM-dd HH:mm:ss, the maximum value is today, the default is yesterday
   * @param {string} [params.endTime] End time yyyy-mm-dd or yyyy-MM-dd HH:mm:ss, the maximum value is today, the default is today
   * @param {string} [params.fromId] The starting transaction ID of the query
   * @param {string} [params.limit] Number of queries, default 100, [1-100]
   */
  transactionHistory (params) {
    validateRequiredParameters({
      symbol: params.symbol
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/transaction_history.do',
      params
    )
  }
}

module.exports = Trade
