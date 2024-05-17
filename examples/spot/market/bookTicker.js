const Spot = require('../../../src/Spot')
const { BASE_URL } = require('../../config')
const { Console } = require('console')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const spot = new Spot({
  baseURL: BASE_URL,
  logger
})

spot
  .createMarket()
  .bookTicker({
    symbol: 'eth_btc'
  })
  .then(res => {
    logger.log(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
