const Spot = require('../../../src/Spot')
const { BASE_URL } = require('../../config')
const { Console } = require('console')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

describe('#Market', () => {
  test('test market api timestamp', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      logger
    })

    return spot
      .createMarket()
      .timestamp()
      .then(res => {
        // logger.log(res.data)
        expect(res.data.error_code).toBe(0)
      })
      .catch(e => {
        logger.error(e)
      })
  })
})
