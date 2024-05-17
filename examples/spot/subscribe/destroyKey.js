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
  .createSubscribe()
  .destroyKey({
    subscribeKey: 'daf1adce73bfdaa1c3393755756b7cc0e1933a79be6d5ce9d372facfc93a1dda'
  })
  .then(res => {
    logger.debug(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
