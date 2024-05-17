'use strict'

const crypto = require('crypto')
const {
  removeEmptyValue,
  buildQueryString,
  sendRequest,
  randomString,
  encodeUrlParameters
} = require('./utils/request')
const LbankConnectorError = require('./errors/LbankConnectorError')
const { SignMethod } = require('./constants')
const defaultLogger = require('./utils/defaultLogger')

class APIBase {
  constructor ({
    apiKey,
    secretKey,
    baseURL,
    logger,
    timeout,
    proxy,
    httpsAgent,
    signMethod
  }) {
    this.logger = logger || defaultLogger()
    this.options = {
      apiKey,
      secretKey,
      baseURL,
      // default is 0 (no timeout)
      timeout: timeout || 0,
      proxy: proxy || false,
      httpsAgent,
      signMethod: signMethod || SignMethod.RSA,
      logger: this.logger
    }
  }

  sendPublicRequest (method, path, params = {}) {
    params = removeEmptyValue(params)
    params = buildQueryString(params)
    if (params !== '') {
      path = `${path}?${params}`
    }
    const { options } = this
    return sendRequest({
      method,
      baseURL: options.baseURL,
      url: path,
      timeout: options.timeout,
      proxy: options.proxy,
      httpsAgent: options.httpsAgent
    })
  }

  /**
   * Send a signed request (apiKey, secretKey, and signMethod parameters are required when instantiating the class).
   * @param {string} method 请求方法 GET, POST
   * @param {string} path 请求路径
   * @param {Object} [params] 请求参数
   */
  sendSignRequest (method, path, params = {}) {
    params = removeEmptyValue(params)
    const { options } = this
    const timestamp = Date.now()
    const echostr = randomString()
    const queryString = buildQueryString({
      ...params,
      timestamp,
      echostr,
      signature_method: options.signMethod,
      api_key: options.apiKey
    })
    const md5 = crypto.createHash('md5')
    const preparedStr = md5.update(queryString).digest('hex').toUpperCase()
    let signature

    if (options.signMethod === SignMethod.HmacSHA256) {
      signature = crypto
        .createHmac('sha256', options.secretKey)
        .update(preparedStr)
        .digest('hex')
    } else {
      if (options.signMethod === SignMethod.RSA) {
        const NodeRSA = require('node-rsa')

        const key = new NodeRSA({
          b: 1024
        })
        key.importKey(options.secretKey, 'pkcs8')
        key.setOptions({ signingScheme: 'sha256' })
        signature = key.sign(Buffer.from(preparedStr), 'base64')

        // signature = crypto
        //   .sign("RSA-SHA256", Buffer.from(preparedStr), Buffer.from(options.secretKey,options.secretKey))
        //   .toString("base64");
      } else {
        throw new LbankConnectorError(
          "signMethod must be either 'RSA' or 'HmacSHA256'"
        )
      }
    }

    const data = {
      ...encodeUrlParameters(params),
      api_key: options.apiKey,
      sign: signature
    }

    // this.logger.info(queryString, preparedStr, data, {
    //   timestamp,
    //   echostr,
    //   signature_method: options.signMethod,
    // });

    return sendRequest({
      method,
      baseURL: options.baseURL,
      url: `${path}`,
      headers: {
        timestamp,
        echostr,
        signature_method: options.signMethod
      },
      data,
      timeout: options.timeout,
      proxy: options.proxy,
      httpsAgent: options.httpsAgent
    })
  }
}

module.exports = APIBase
