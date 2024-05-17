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
    return spot
      .createTrade()
      .cancelOrderBySymbol({
        symbol: res.data.data.symbol
      })
      .then(result => {
        logger.debug(result.data)
      })
      .catch(e => {
        logger.error(e)
      })
  })
  .catch(e => {
    logger.error(e)
  })
