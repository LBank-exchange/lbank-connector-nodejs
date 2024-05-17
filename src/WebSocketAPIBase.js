const WebSocketClient = require('ws')
const defaultLogger = require('./utils/defaultLogger')

class WebSocketAPIBase {
  constructor (baseUrl, options = {}) {
    this.baseUrl = baseUrl
    this.logger = options.logger || defaultLogger()
    this.events = {
      open: options.open,
      message: options.message,
      ping: options.ping,
      pong: options.pong,
      error: options.error,
      close: options.close
    }
    this.reconnectDelay = options.reconnectDelay || 5000
    if (options.autoConnect !== false) {
      this.connect()
    }
  }

  isConnected () {
    return !(!this.ws || this.ws.readyState !== WebSocketClient.OPEN)
  }

  isConnecting () {
    return !!(this.ws && this.ws.readyState === WebSocketClient.CONNECTING)
  }

  connect () {
    const url = this.baseUrl
    const ws = new WebSocketClient(url)
    this.logger.info(`Sending Websocket connection to: ${url}`)
    this.ws = ws
    this.closeInitiated = false

    ws.on('open', () => {
      this.logger.info(`Connected to the Websocket Server: ${url}`)
      this.events.open && this.events.open(this)
    })

    // handle data message. Pass the data to the call back method from user
    // It could be useful to store the original messages from server for debug
    ws.on('message', data => {
      const message = data.toString()
      let obj
      if (message.startsWith('{') && message.endsWith('}')) {
        try {
          obj = JSON.parse(message)
          // 客户端收到PING消息后，需发送PONG消息回应
          if (obj && obj.action === 'ping') {
            this.logger.info('Send PONG to server', {
              action: 'pong',
              pong: obj.ping
            })
            this.sendMessage(
              JSON.stringify({
                action: 'pong',
                pong: obj.ping
              })
            )
          }
        } catch (error) {
          this.logger.error(error)
        }
      }
      this.events.message && this.events.message(obj || message)
    })

    ws.on('ping', () => {
      // As ping pong is very important for maintaining the connection, log them as INFO level
      this.logger.info('Received PING from server')
      this.events.ping && this.events.ping()
      ws.pong()
      this.logger.info("Responded PONG to server's PING message")
    })

    ws.on('pong', () => {
      this.logger.info('Received PONG from server')
      this.events.pong && this.events.pong()
    })

    ws.on('error', err => {
      this.logger.error('Received error from server')
      this.events.error && this.events.error()
      this.logger.error(err)
    })

    ws.on('close', (closeEventCode, reason) => {
      if (!this.closeInitiated) {
        this.events.close && this.events.close()
        this.logger.warn(
          `Connection close due to ${closeEventCode}: ${reason}.`
        )
        this.reconnectTimer = setTimeout(() => {
          this.reconnectTimer = null
          this.logger.debug('Reconnect to the server.')
          this.connect(url)
        }, this.reconnectDelay || 5000)
      } else {
        this.closeInitiated = false
      }
    })
  }

  disconnect () {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (!this.isConnected() && !this.isConnecting()) {
      this.logger.warn('No connection to close.')
    } else {
      this.closeInitiated = true
      this.ws.close()
      this.logger.info('Disconnected with Lbank Websocket Server')
    }
  }

  sendMessage (params = {}) {
    if (!this.isConnected()) {
      this.logger.warn('Send only can be sent when connection is ready.')
    } else {
      this.ws.send(typeof params === 'string' ? params : JSON.stringify(params))
    }
  }
}

module.exports = WebSocketAPIBase
