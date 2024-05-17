class WebSocketModuleBase {
  constructor (client) {
    this.client = client
  }

  sendMessage (params = {}) {
    this.client.sendMessage(params)
  }
}

module.exports = WebSocketModuleBase
