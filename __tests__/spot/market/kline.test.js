const Spot = require('../../../src/Spot')
const { BASE_URL } = require('../../config')
const { Console } = require('console')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

describe('#Market', () => {
  test('test market api kline', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      logger
    })

    return spot
      .createMarket()
      .kline({
        symbol: 'eth_btc',
        size: 5,
        type: 'minute5',
        time: Math.round(Date.now() / 1000)
      })
      .then(res => {
        // logger.log('kline result:', res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logger.error(e)
      })
  })
})
