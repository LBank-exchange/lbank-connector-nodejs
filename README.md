# LBank Public API connector NodeJS

This is a lightweight library that works as a connector to the [LBank public API](https://www.lbank.com/en-US/docs/index.html).

It supports the following APIs:

- Spot Rest API;
- Spot WebSocket API;

Additionally, it includes test cases and examples.

## Documentation

[https://www.lbank.com/en-US/docs/index.html](https://www.lbank.com/en-US/docs/index.html)

## Examples

The examples are located under **examples**. Before running any of it, `config.js` must be set up correctly with `API_KEY` and` SECRET_KEY` and `SIGN_METHOD` .

Note that this `config.js` is only used for examples, you should have your own configuration file when using the library.

### REST APIs

#### Market Endpoint: Exchange Information

```js
const { Spot } = require('@lbankcom/lbank-connector')

const BASE_URL = ''

const client = new Spot({
  baseURL: BASE_URL
})
const result = client.createMarket().bookTicker({})
```

#### Trade Endpoint: Testing a new order

```js
const { Spot } = require('@lbankcom/lbank-connector')
const { Console } = require('console')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const BASE_URL = ''
const API_KEY = ''
const SECRET_KEY = ''
const SIGN_METHOD = ''

const spot = new Spot({
  // REST API baseURL, see: https://www.lbank.com/en-US/docs/index.html#url
  baseURL: BASE_URL,
  // Get api key & secretKey from: https://www.lbank.com/zh-TW/my/api-management
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  // Signature method: 'RSA' | 'HmacSHA256'.
  signMethod: SIGN_METHOD,
  logger
})

return (
  spot
    // Create a trade endpoints
    .createTrade()
    .createOrderTest({
      symbol: 'eth_btc',
      type: 'buy',
      price: 100,
      amount: 10
    })
    .then(res => {
      logger.debug(res.data)
    })
    .catch(e => {
      logger.error(res.data)
    })
)
```

Please find `examples` folder to check for more endpoints.

#### Custom Logger Integration

```javascript
const { Spot } = require('@lbankcom/lbank-connector')
const fs = require('fs')
const { Console } = require('console')

// make sure the logs/ folder is created beforehand
const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', { logger: logger })

client
  .creatMarket()
  .currencyPairs()
  .then(response => client.logger.log(response.data))
// check the output file
```

### WebSocket API

```js
const { Console } = require('console')

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const WS_API_URL = ''

const webSocketAPI = new WebSocketAPI(WS_API_URL, {
  logger,
  open() {
    webSocketAPI.ping()
  },
  message(msg) {
    logger.info(msg)
  }
})

setTimeout(() => {
  logger.info('disconnect')
  webSocketAPI.disconnect()
}, 100000)
```

If `requestId` is empty (`""`), `null` or not sent, this library will generate a `UUID` string for it.

Different types of WebSocket callbacks are available.

#### Auto Reconnect

If there is a close event not initiated by the user, the reconnection mechanism will be triggered in 5 secs.

#### Ping Server

It is possible to ping server from client, and expect to receive a PONG message.

```javascript
webSocketAPI.ping()
```

## Features

### Optional parameters

Parameters can be set in any implementation of `{}` interface, where `string` represents the parameter name and `Object` the parameter value. These parameters should have the same naming as in the API doc."

```js
const parameters = {
  symbol: 'eth_btc',
  type: 'buy',
  price: 100,
  amount: 10
}
```

### Types of Signature Generator

When creating `SpotClient` you use one of the following types of Signature to create signatures (for SIGNED endpoints) based on your security preference:

- `HmacSHA256` - Use of API Key and Secret Key.

```js
const client = new Spot({
  baseURL: config.BASE_URL,
  apiKey: config.API_KEY,
  secretKey: config.SECRET_KEY,
  signMethod: 'HmacSHA256'
})
```

- `RSA` - Use of API Key and RSA algorithm keys.

```js
const client = new Spot({
  baseURL: config.BASE_URL,
  apiKey: config.API_KEY,
  secretKey: config.SECRET_KEY,
  signMethod: 'RSA'
})
```

## Errors

There are 2 types of error which may be thrown by this library.

- `MissingParameterError`
  - This is thrown when there is a validation error for parameters.For instance, mandatory parameter not sent. This error will be thrown before the request is sent to the server.
- `LbankClientError`
  - The error consists of these 3 objects which will help in debugging the error:
    - `errorCode` - API Server's error code, e.g. `-10000`

```js
client
  .createTrade()
  .createOrderTest(parameters)
  .then(res => {
    logger.info(result)
  })
  .catch(e => {
    logger.error(e)
  })
```

## Test Cases

`npm run test`
