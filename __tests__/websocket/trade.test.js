const { WS_API_URL } = require('../config')
const { Console } = require('console')
const WebSocketAPI = require('../../src/WebSocketAPI')
const { Spot } = require('../../src')
const { BASE_URL, API_KEY, SECRET_KEY, SIGN_METHOD } = require('../../examples/config')

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

describe('#Spot Subscribe Trade', () => {
  // 测试
  test('test orderUpdate subscribe', () => {
    const spot = new Spot({
      baseURL: BASE_URL,
      apiKey: API_KEY,
      secretKey: SECRET_KEY,
      signMethod: SIGN_METHOD,
      logger
    })

    return new Promise((resolve, reject) => {
      spot.createSubscribe().getKey().then(res => {
        const subscribeKey = res.data?.data

        const webSocketAPI = new WebSocketAPI(WS_API_URL, {
          logger,
          open () {
            webSocketAPI.trade().orderUpdate({
              action: 'subscribe',
              pair: 'all',
              subscribeKey
            })
          },
          message (msg) {
            messageResolver(webSocketAPI, msg, resolve)
          }
        })

        // 如果五秒内没有错误响应，则任务测试通过
        setTimeout(() => {
          webSocketAPI.disconnect()
          resolve()
        }, 5000)
      })
    })
  })
})
