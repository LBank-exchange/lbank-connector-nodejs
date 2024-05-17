const { Console } = require('console')
const WebSocketAPI = require('../../../src/WebSocketAPI')
const { WS_API_URL } = require('../../config')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const webSocketAPI = new WebSocketAPI(WS_API_URL, {
  logger,
  open () {
    webSocketAPI.market().kbar({
      action: 'subscribe',
      pair: 'eth_usdt',
      kbar: '1min'
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
