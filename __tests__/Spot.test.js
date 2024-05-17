const Spot = require('../src/Spot')
const { BASE_URL } = require('./config')

describe('#Spot', () => {
  test('test accuracy', () => {
    const spot = new Spot({
      baseURL: BASE_URL
    })

    spot
      .createMarket()
      .accuracy()
      .then((res) => {
        expect(res.data.error_code).toBe(0)
      })
  })
})
