const Spot = require('../../../src/Spot')
const defaultLogger = require('../../../src/utils/defaultLogger')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')

const logger = defaultLogger()

describe('#Trade', () => {
  test('test trade api cancelOrderBySymbol', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createTrade()
      .createOrder({
        symbol: 'eth_btc',
        type: 'buy',
        price: 100,
        amount: 10
      })
      .then(res => {
        // logger.debug('createOrder2', res.data)
        // expect(res.data.error_code).toBe(0)
        return spot
          .createTrade()
          .cancelOrderBySymbol({
            symbol: res.data.data.symbol
          })
          .then(result => {
            // logger.debug('cancelOrderBySymbol', result.data)
            expect(result.data.error_code).toBe(0)
          })
          .catch(e => {
            logger.error(e)
          })
      })
      .catch(e => {
        logger.error(e)
      })
  })
})
