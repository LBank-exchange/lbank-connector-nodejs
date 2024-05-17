const { randomString } = require('../../src/utils/request')

describe('#randomString', () => {
  test('test randomString', () => {
    expect(randomString().length).toBe(32)
  })
})
