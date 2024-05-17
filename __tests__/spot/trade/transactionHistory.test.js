const Spot = require('../../../src/Spot')
const defaultLogger = require('../../../src/utils/defaultLogger')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')

const logger = defaultLogger()

describe('#Trade', () => {
  test('test trade api transactionHistory', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createTrade()
      .transactionHistory({
        symbol: 'eth_btc',
        startTime: '2024-05-10 00:00:00',
        endTime: '2024-05-11 00:00:00',
        fromId: 'df504ac77c06a02750f9a21308e625ef62c33f48',
        limit: 10
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
