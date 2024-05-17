'use strict'

const packageJson = require('../package.json')

const appName = packageJson.name + '-node'
const appVersion = packageJson.version

const SignMethod = {
  RSA: 'RSA',
  HmacSHA256: 'HmacSHA256'
}

const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
}

const ErrorCode = {
  '00000': 'return success',
  10000: 'Internal error',
  10001: 'The required parameters can not be empty',
  10002: 'Validation Failed',
  10003: 'Invalid parameter',
  10004: 'Request too frequent',
  10005: 'Secret key does not exist',
  10006: 'User does not exist',
  10007: 'Invalid signature',
  10008: 'Invalid Trading Pair',
  10009: 'Price and/or Amount are required for limit order',
  10010: 'Price and/or Amount must less than minimum require',
  10011: 'Buy at market price, price must be passed',
  10012: 'Sell at market price, amount must be passed',
  10013: 'Order quantity lower than minimum transaction quantity',
  10014: 'Insufficient amount of money in account',
  10015: 'Invalid order type',
  10016: 'Insufficient account balance',
  10017: 'Server Error',
  10018: 'Page size should be between 1 and 50',
  10019: 'Cancel NO more than 3 orders in one request',
  10020: 'Volume < 0.001',
  10021: 'Price < 0.01',
  10022: 'Invalid authorization',
  10023: 'Market Order is not supported yet',
  10024: 'User cannot trade on this pair',
  10025: 'Order has been filled',
  10026: 'Order has been cancelld',
  10027: 'Order is cancelling',
  10028: 'Wrong query time',
  10029: "'from' is not in the query time",
  10030: "'from' do not match the transaction type of inqury",
  10031: 'echostr length must be valid and length must be from 30 to 40',
  10032: 'The order number does not exist',
  10033: 'Failed to create order',
  10036: 'customID duplicated',
  10037: 'Order has been cancelled or completed',
  10039: 'Order timeout cancellation',
  10066: 'Please check the chain name',
  10100: 'Has no privilege to withdraw',
  10101: 'Invalid fee rate to withdraw',
  10102: 'Too little to withdraw',
  10103: 'Exceed daily limitation of withdraw',
  10104: 'Cancel was rejected',
  10105: 'Request has been cancelled',
  10106: 'None trade time',
  10107: 'Start price exception',
  10108: 'can not create order',
  10109: 'wallet address is not mapping',
  10110: 'transfer fee is not mapping',
  10111: 'mount > 0',
  10112: 'fee is too lower',
  10113: 'transfer fee is 0',
  10114: 'Incorrect precision of withdrawal quantity',
  10116: 'Upgrading in progress, please try again later',
  10117: 'Station withdrawal not enabled',
  10119: 'Interface upgrade, please use /v2/supplement/withdraw.do',
  10120: 'Less than the minimum transaction limit',
  10600: 'intercepted by replay attacks filter, check timestamp',
  10601: 'Interface closed unavailable',
  10701: 'invalid asset code',
  10702: 'not allowed deposit',
  10801: 'Withdrawal address whitelist verify failed'
}

module.exports = { SignMethod, HttpMethod, ErrorCode, appName, appVersion }
