const Spot = require('../../../src/Spot')
const { BASE_URL } = require('../../config')
const { Console } = require('console')
const { API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../../examples/config')

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
}).createSubscribe()

describe('#Subscribe', () => {
  test('test get subscribe key', () => {
    return spot.getKey()
      .then((res) => {
        logger.log(res.data)
        expect(res.data.error_code).toBe(0)
      })
  })

  test('test refresh subscribe key', () => {
    return spot.getKey()
      .then((res) => {
        const subscribeKey = res.data.data

        return spot.refreshKey({ subscribeKey }).then(res => {
          logger.info(res.data)
          expect(res.data.error_code).toBe(0)
        })
      })
  })

  test('test destroy subscribe key', () => {
    return spot.getKey()
      .then((res) => {
        const subscribeKey = res.data.data

        return spot.destroyKey({ subscribeKey }).then(res => {
          logger.info(res.data)
          expect(res.data.error_code).toBe(0)
        })
      })
  })
})
