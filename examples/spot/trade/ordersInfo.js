const Spot = require('../../../src/Spot')
const { Console } = require('console')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const spot = new Spot({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  signMethod: SIGN_METHOD,
  logger
})

spot
  .createTrade()
  .createOrder({
    symbol: 'eth_btc',
    type: 'buy',
    price: 100,
    amount: 10
  })
  .then(res => {
    // logger.debug(res.data)
    // expect(res.data.error_code).toBe(0)
    return spot
      .createTrade()
      .ordersInfo({
        symbol: res.data.data.symbol,
        orderId: res.data.data.order_id
      })
      .then(result => {
        logger.debug(result.data)
        // expect(result.data.error_code).toBe(0)
      })
      .catch(e => {
        logger.error(e)
      })
  })
  .catch(e => {
    logger.error(e)
  })
