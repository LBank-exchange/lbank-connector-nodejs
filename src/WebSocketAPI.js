const WebSocketAPIBase = require('./WebSocketAPIBase')
const Market = require('./modules/websocket/Market')
const Account = require('./modules/websocket/Account')
const Trade = require('./modules/websocket/Trade')
const { randomString } = require('./utils/request')

class WebSocketAPI extends WebSocketAPIBase {
  market () {
    return new Market(this)
  }

  account () {
    return new Account(this)
  }

  trade () {
    return new Trade(this)
  }

  ping (id = randomString()) {
    this.sendMessage({
      action: 'ping',
      ping: id
    })
  }
}

module.exports = WebSocketAPI
