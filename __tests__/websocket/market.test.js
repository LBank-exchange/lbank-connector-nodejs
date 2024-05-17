const { WS_API_URL } = require('../config')
const { Console } = require('console')
const WebSocketAPI = require('../../src/WebSocketAPI')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const messageResolver = (webSocketAPI, msg, resolve) => {
  logger.info(msg)

  const isError = msg.status === 'error'

  expect(isError).toBeFalsy()
  logger.info('disconnect')
  webSocketAPI.disconnect()
  resolve()
}

describe('#Spot Subscribe Market', () => {
  // 测试 Kbar 订阅
  test('test kbar subscribe', () => {
    return new Promise(resolve => {
      const webSocketAPI = new WebSocketAPI(WS_API_URL, {
        logger,
        open () {
          webSocketAPI.market().kbar({
            action: 'subscribe',
            subscribe: 'kbar',
            pair: 'btc_usdt',
            kbar: '1min'
          })
        },
        message (msg) {
          messageResolver(webSocketAPI, msg, resolve)
        }
      })
    })
  })

  // 测试深度订阅
  test('test depth subscribe', () => {
    return new Promise(resolve => {
      const webSocketAPI = new WebSocketAPI(WS_API_URL, {
        logger,
        open () {
          webSocketAPI.market().depth({
            action: 'subscribe',
            depth: 100,
            pair: 'btc_usdt'
          })
        },
        message (msg) {
          messageResolver(webSocketAPI, msg, resolve)
        }
      })
    })
  })

  // 测试 市场行情 订阅
  test('test tick subscribe', () => {
    return new Promise(resolve => {
      const webSocketAPI = new WebSocketAPI(WS_API_URL, {
        logger,
        open () {
          webSocketAPI.market().tick({
            action: 'subscribe',
            pair: 'eth_usdt'
          })
        },
        message (msg) {
          messageResolver(webSocketAPI, msg, resolve)
        }
      })
    })
  })

  // 测试 交易记录 订阅
  test('test tick subscribe', () => {
    return new Promise(resolve => {
      const webSocketAPI = new WebSocketAPI(WS_API_URL, {
        logger,
        open () {
          webSocketAPI.market().tick({
            action: 'subscribe',
            pair: 'eth_usdt'
          })
        },
        message (msg) {
          messageResolver(webSocketAPI, msg, resolve)
        }
      })
    })
  })
})
