const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

describe('#Wallet', () => {
  test('test wallet api userInfo', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .userInfo()
      .then((res) => {
        log('userInfo', res.data)
        expect(res.data.error_code).toBe(0)
        expect(res.data.data).toBeInstanceOf(Array)
        expect(res.data.data.length).toBeGreaterThan(0)
      })
      .catch(e => {
        logError(e)
      })
  })
})
