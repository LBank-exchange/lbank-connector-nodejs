const Spot = require('../../../src/Spot')
const { Console } = require('console')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const spot = new Spot({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  signMethod: SIGN_METHOD,
  logger
})

spot
  .createTrade()
  .ordersInfoNoDeal({
    symbol: 'lbk_usdt',
    current_page: 1,
    page_length: 10
  })
  .then(res => {
    logger.debug(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
