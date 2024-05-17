const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

describe('#Wallet', () => {
  test('test wallet api systemStatus', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .systemStatus()
      .then((res) => {
        log('systemStatus', res.data)
        expect(res.data.data).toEqual({ status: expect.stringMatching(/^[01]$/) })
      })
      .catch(e => {
        logError(e)
      })
  })
})
