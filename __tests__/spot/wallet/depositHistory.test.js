const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

describe('#Wallet', () => {
  test('test wallet api depositHistory', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .depositHistory()
      .then((res) => {
        log('depositHistory', res.data.error_code)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logError(e)
      })
  })
})
