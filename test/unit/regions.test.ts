
const assert = require('node:assert')
import regions from '../../src/lib/regions'

describe('Regions', function () {
  it('contains US', function () {
    assert.equal(Object.keys(regions).includes('US'), true)
  })
  it('contains CN', function () {
    assert.equal(Object.keys(regions).includes('CN'), true)
  })
  it('contains 3 regions', function () {
    assert.equal(Object.keys(regions).length, 3)
  })
})
