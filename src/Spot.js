const APIBase = require('./APIBase')
const Market = require('./modules/spot/Market')
const Subscribe = require('./modules/spot/Subscribe')
const Trade = require('./modules/spot/Trade')
const Wallet = require('./modules/spot/Wallet')

class Spot extends APIBase {
  createMarket () {
    return new Market(this.options)
  }

  createWallet () {
    return new Wallet(this.options)
  }

  createTrade () {
    return new Trade(this.options)
  }

  createSubscribe () {
    return new Subscribe(this.options)
  }
}

module.exports = Spot
