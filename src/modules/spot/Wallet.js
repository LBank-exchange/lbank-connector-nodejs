const APIBase = require('../../APIBase')
const { HttpMethod } = require('../../constants')
const { validateRequiredParameters } = require('../../utils/validation')

/**
 * Wallet Endpoints
 */
class Wallet extends APIBase {
  /**
   * System status - Get system status.
   */
  systemStatus () {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/system_status.do'
    )
  }

  /**
   * Get all coins information - Get all the currency information for the user (LBK supports deposit and withdrawal operations).
   */
  userInfo () {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/user_info.do'
    )
  }

  /**
   * Withdrawal - User withdrawal
   * @param {Object} params request parameters
   * @param {string} params.address withdrawal address, when type=1, it is the transfer account
   * @param {string} params.coin currency
   * @param {string} params.amount withdrawal amount
   * @param {string} params.fee fee
   * @param {string} [params.networkName] Chain name, get it through the Get All Coin Information interface
   * @param {string} [params.memo] memo: memo word of bts and dct
   * @param {string} [params.mark] Withdrawal Notes
   * @param {string} [params.name] Remarks of the address. After filling in this parameter, it will be added to the withdrawal address book of the currency.
   * @param {string} [params.withdrawOrderId] Custom withdrawal id
   * @param {string} [params.type] type=1 is for intra-site transfer
   */
  withdraw (params) {
    validateRequiredParameters({
      address: params.address,
      coin: params.coin,
      amount: params.amount,
      fee: params.fee
    })
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/withdraw.do',
      params
    )
  }

  /**
   * Get recharge history - User access to recharge history
   *
   * @param {Object} [params] request parameters
   * @param {string} [params.status] Recharge status: ("1","Applying"),("2","Recharge successful"),("3","Recharge failed"),("4","Already Cancel"), ("5", "Transfer")
   * @param {string} [params.coin] currency
   * @param {string} [params.startTime] Start time, timestamp in milliseconds, default 90 days ago
   * @param {string} [params.endTime] end time, timestamp in milliseconds, default day
   *
   */
  depositHistory (params) {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/deposit_history.do',
      params
    )
  }

  /**
   * Get withdrawal history - User's coin withdrawal history
   *
   * @param {Object} [params] request parameters
   * @param {string} [params.status] status: ("1","Applying"),("2","Cancelled"),("3","Withdrawal failed"),("4","Withdrawal complete")
   * @param {string} [params.coin] currency
   * @param {string} [params.withdrawOrderId] Custom withdrawal id
   * @param {string} [params.startTime] Start time, timestamp in milliseconds, default 90 days ago
   * @param {string} [params.endTime] end time, timestamp in milliseconds, default day
   *
   */
  withdraws (params) {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/withdraws.do',
      params
    )
  }

  /**
   * The user obtains the deposit address - The user obtains the recharge address
   *
   * @param {Object} [params] request parameters
   * @param {string} [params.networkName] chain name
   * @param {string} [params.coin] currency
   *
   */
  getDepositAddress (params) {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/get_deposit_address.do',
      params
    )
  }

  /**
   * The user obtains the deposit address - The user obtains the recharge address
   *
   * @param {Object} [params] request parameters
   * @param {string} [params.coin] currency
   *
   */
  assetDetail (params) {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/asset_detail.do',
      params
    )
  }

  /**
   * Transaction fee rate query - User transaction fee rate query
   *
   * @param {Object} [params] request parameters
   * @param {string} [params.category] Trading pair, eg: lbk_usdt
   *
   */
  customerTradeFee (params) {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/customer_trade_fee.do',
      params
    )
  }

  /**
   * Query user API Key permissions - Query user API Key permissions
   *
   */
  apiRestrictions () {
    return this.sendSignRequest(
      HttpMethod.POST,
      '/v2/supplement/api_Restrictions.do'
    )
  }
}

module.exports = Wallet
