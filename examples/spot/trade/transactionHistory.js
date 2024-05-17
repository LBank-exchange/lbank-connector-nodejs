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
  .transactionHistory({
    symbol: 'eth_btc',
    startTime: '2024-05-10 00:00:00',
    endTime: '2024-05-11 00:00:00',
    fromId: 'df504ac77c06a02750f9a21308e625ef62c33f48',
    limit: 10
  })
  .then(res => {
    logger.debug(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
