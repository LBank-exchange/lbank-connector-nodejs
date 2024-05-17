const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

const assetDetailParams = {
  coin: 'lbk'
}

describe('#Wallet', () => {
  test('test wallet api assetDetail', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .assetDetail(assetDetailParams)
      .then((res) => {
        log('assetDetail', res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logError(e)
      })
  })
})
