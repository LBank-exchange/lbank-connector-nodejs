const Spot = require('../../../src/Spot')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { logger, log, logError } = require('./utils')

const withdrawParams = {
  address: 'LBA9G85396',
  coin: 'lbk',
  amount: '1',
  // memo: '16334213422112634037',
  mark: 'this',
  fee: '1',
  type: 1
}

describe('#Wallet', () => {
  test('test wallet api withdraw', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return spot
      .createWallet()
      .withdraw(withdrawParams)
      .then((res) => {
        log('withdraw', res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logError(e)
      })
  })
})
