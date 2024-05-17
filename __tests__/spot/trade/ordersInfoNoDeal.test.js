const Spot = require('../../../src/Spot')
const defaultLogger = require('../../../src/utils/defaultLogger')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')

const logger = defaultLogger()

describe('#Trade', () => {
  test('test trade api ordersInfoNoDeal', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createTrade()
      .ordersInfoNoDeal({
        symbol: 'lbk_usdt',
        current_page: 1,
        page_length: 10
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
