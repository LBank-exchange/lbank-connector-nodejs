const Spot = require('../../../src/Spot')
const { BASE_URL } = require('../../config')
const { Console } = require('console')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

describe('#Market', () => {
  test('test market api withdrawConfigs', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      logger
    })

    return spot
      .createMarket()
      .withdrawConfigs({
        assetCode: 'btc'
      })
      .then(res => {
        // logger.log('withdrawConfigs result:', res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logger.error(e)
      })
  })
})
