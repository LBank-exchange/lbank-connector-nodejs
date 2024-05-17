const Spot = require('../../../src/Spot')
const defaultLogger = require('../../../src/utils/defaultLogger')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const logger = defaultLogger()

const spot = new Spot({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  signMethod: SIGN_METHOD,
  logger
})

spot
  .createWallet()
  .depositHistory()
  .then(res => {
    logger.debug(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
