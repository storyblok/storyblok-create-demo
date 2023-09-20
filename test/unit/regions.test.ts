
const assert = require('node:assert')
import regions from '../../src/lib/regions'

describe('Regions', function () {
  it('contains US', function () {
    assert.equal(Object.keys(regions).includes('US'), true)
  })
  it('not contains CN', function () {
    assert.equal(Object.keys(regions).includes('CN'), false)
  })
  it('contains 2 regions', function () {
    assert.equal(Object.keys(regions).length, 2)
  })
})
