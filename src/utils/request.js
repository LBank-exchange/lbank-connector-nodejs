const crypto = require('crypto')
const axios = require('axios')

const constants = require('../constants')
const LbankClientError = require('../errors/LbankClientError')
const isEmptyValue = require('./isEmptyValue')

const removeEmptyValue = obj => {
  if (!(obj instanceof Object)) return {}
  Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
  return obj
}

const randomString = () => crypto.randomBytes(16).toString('hex')

const encodeUrlParameters = params => {
  if (!params) return params

  return Object.keys(params).reduce((result, key) => {
    result[key] = encodeURIComponent(params[key])
    return result
  }, {})
}

/**
 * NOTE: The array conversion logic is different from usual query string.
 * E.g. symbols=["BTCUSDT","BNBBTC"] instead of symbols[]=BTCUSDT&symbols[]=BNBBTC
 */
const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
  return `${key}=${encodeURIComponent(valueString)}`
}

const buildQueryString = params => {
  if (!params) return ''
  return Object.entries(params)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(stringifyKeyValuePair)
    .join('&')
}

const getRequestInstance = config => {
  const axiosInstant = axios.default.create({
    ...config
  })

  axiosInstant.interceptors.response.use(response => {
    if (response.data.error_code !== 0) {
      throw new LbankClientError(response.data.error_code, response)
    }
    return response
  })

  return axiosInstant
}

const sendRequest = config => {
  const { baseURL, method, url, timeout, proxy, httpsAgent, headers, data } =
    config

  return getRequestInstance({
    baseURL,
    timeout,
    proxy,
    httpsAgent,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': `${constants.appName}/${constants.appVersion}`,
      ...headers
    }
  }).request({
    method,
    url,
    data
  })
}

module.exports = {
  removeEmptyValue,
  randomString,
  sendRequest,
  buildQueryString,
  encodeUrlParameters
}
