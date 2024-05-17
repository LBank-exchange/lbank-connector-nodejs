const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

const getDepositAddressParams = {
  coin: 'lbk'
}

describe('#Wallet', () => {
  test('test wallet api getDepositAddress', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .getDepositAddress(getDepositAddressParams)
      .then((res) => {
        log('getDepositAddress', res.data)
        expect(res.data.data.address).toBe('0x884e9ef99989a5bed94cff76108251af8de777028')
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logError(e)
      })
  })
})
