const WebSocketAPI = require('../../src/WebSocketAPI')
const defaultLogger = require('../../src/utils/defaultLogger')
const { WS_API_URL } = require('../config')

const logger = defaultLogger()

describe('#Spot', () => {
  it('test websocket ping', () => {
    return new Promise(resolve => {
      const webSocketAPI = new WebSocketAPI(WS_API_URL, {
        logger,
        open () {
          webSocketAPI.ping()
        },
        message (msg) {
          logger.info(msg)
          expect(msg.action).toBe('pong')
          logger.info('disconnect')
          webSocketAPI.disconnect()
          resolve()
        }
      })
    })
  })
})
