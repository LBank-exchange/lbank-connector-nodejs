const Spot = require('../../../src/Spot')
const defaultLogger = require('../../../src/utils/defaultLogger')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const logger = defaultLogger()

const withdrawParams = {
  address: 'LBA9G85396',
  coin: 'lbk',
  amount: '1',
  // memo: '16334213422112634037',
  mark: 'this',
  fee: '1',
  type: 1
}

const spot = new Spot({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  signMethod: SIGN_METHOD,
  logger
})

spot
  .createWallet()
  .withdraw(withdrawParams)
  .then(res => {
    logger.debug(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
