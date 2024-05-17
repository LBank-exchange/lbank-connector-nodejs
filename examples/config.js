// const BASE_URL = 'https://www.lbkex.net'

// const WS_API_URL = 'wss://www.lbkex.net/ws/V2/'

const BASE_URL = 'https://ccapi.lbk.world'
const WS_API_URL = 'wss://ccws.lbk.world/ws/V2/'

// hmac
// const SIGN_METHOD = 'HmacSHA256' /* HmacSHA256 & RSA */
// const API_KEY = 'd68202b1-b534-47e4-84ce-a898f8b79e6e'
// const SECRET_KEY = '33D4B2A93C8E8B7ED03EDC39420A6F98'

// rsa
const SIGN_METHOD = 'RSA' /* HmacSHA256 & RSA */
const API_KEY = '29610b52-3ea0-4055-915c-730274352aae'
const SECRET_KEY =
  'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAN6CFdRT4r/V3E8G50eDa4mXalOMtFnhTTO1IvS9CIxm+AV21FGTeZ+mQMyW0Lc/u8QWQ6R6C8XxbhymeX3mueQ8FqwuHjEwPVjHU/AoqdX9xJVEjZEKaH9/mtTVsBORmqOn1GN+KF63O/I7DXhIWNz3PuoFOdqrL7LYuSxJJvTRAgMBAAECgYBaPkBEQVFxpHcZxh7/LhnrT/HbuPFckrgRBKIMyK4y44AsFym9fCaTzYXydChqafrpaG4+wxELUwPpsssLeQxi9yY6AwedUp1D01chSCaLnEmiRvXxrVf7tHpUVQsk/kMYrFy/95y1S5BHIjZ5RGdRWh5ja8FPiXs/vBJDhMZC0QJBAPQuo9mO65Q86ZMCqkKeO4GwEYHjeJm11F4AN8G0XCNQ+u9YQqg8vJiA/us8TPr3d9ps2ritKrW+m9408c7IhVcCQQDpRuiwY1mLQb/oqf2X/rMm7Wzow4QWJc9q5dhzkcCpzu2SBeQnqhfZt2stoTXUmSmdpr4bE35tTiyZB0uNzpYXAkAdj5/qcLD4az9jusjd88YEd0pHTUCGa0rgbmpRmwIkjGM0opy/PUsfs04pME2pfFgYK2F3Rg+LnR3FkudLP19VAkBmmgqUMk5bIqMe2U2xwZPYhksFoaECAMVW9hsa0buUtG/nbvHnxDdTSgo4+pPrmyYjsgghbpSHzP9umzfO+lMnAkEA7M+WJx1J/V6+JeJoZDJtZbOTqrrqh/q7Nfcv66I2rclJTu9V43qtpZphxOnA2HAk9/kRWj+izWTuKERABV8kPw=='

module.exports = {
  BASE_URL,
  WS_API_URL,
  SIGN_METHOD,
  API_KEY,
  SECRET_KEY
}
