const Spot = require('../../../src/Spot')
const defaultLogger = require('../../../src/utils/defaultLogger')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')

const logger = defaultLogger()

describe('#Trade', () => {
  test('test trade api createOrderTest', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createTrade()
      .createOrderTest({
        symbol: 'eth_btc',
        type: 'buy',
        price: 100,
        amount: 10
      })
      .then(res => {
        // logger.debug(res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logger.error(e)
      })
  })
})
