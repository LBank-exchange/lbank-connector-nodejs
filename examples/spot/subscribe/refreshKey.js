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
  .refreshKey({
    subscribeKey: '4027b6ac2ac1ef6f96748997b82e50cffacce45fd7ca105d1d075cbe38cc3baf'
  })
  .then(res => {
    logger.debug(res.data)
  })
  .catch(e => {
    logger.error(e)
  })
