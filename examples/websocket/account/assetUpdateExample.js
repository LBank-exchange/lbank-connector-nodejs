const { Console } = require('console')
const WebSocketAPI = require('../../../src/WebSocketAPI')
const { WS_API_URL, BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../config')
const { Spot } = require('../../../src')

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

spot.createSubscribe().getKey().then(res => {
  const subscribeKey = res.data?.data

  const webSocketAPI = new WebSocketAPI(WS_API_URL, {
    logger,
    open () {
      webSocketAPI.account().assetUpdate({
        action: 'subscribe',
        subscribeKey
      })
    },
    message (msg) {
      logger.info(msg)
    }
  })

  setTimeout(() => {
    logger.info('disconnect')
    webSocketAPI.disconnect()
  }, 100000)
}).catch(err => {
  logger.error(err)
})
