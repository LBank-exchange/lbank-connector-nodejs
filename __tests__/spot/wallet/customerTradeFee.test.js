const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

const customerTradeFeeParams = {
  category: 'lbk_usdt'
}

describe('#Wallet', () => {
  test('test wallet api customerTradeFee', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .customerTradeFee(customerTradeFeeParams)
      .then((res) => {
        log('customerTradeFee', res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logError(e)
      })
  })
})
