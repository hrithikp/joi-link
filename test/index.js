const _ = require('lodash')
const Code = require('code')
const Lab = require('lab')
const Joi = require('../')
const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const expect = Code.expect
exports.lab = lab
function schemaWith(link) {
  return Joi.object({
    "@id": Joi.string().link(link),
    "test": Joi.string()
  }).options({
    stripUnknown: true
  })
}
describe('Joi.string().link(value) - builds and validates a link value.', () => {
  it('value can be a non-empty templated string.', (done) => {
    let schema = schemaWith("/foo/$_id")
    let value = {
      '@id': 'fooo',
      _id: 'abc123',
      test: "bar"
    }
    let result = Joi.validate(value, schema, {
      context: value
    })
    expect(result).to.be.object()
    expect(result.error).to.be.null()
    expect(result.value).to.be.object()
    expect(result.value['@id']).to.be.equal('/foo/abc123')
    done()
  })
  it('value can be a non-empty array of strings or refs.', (done) => {
    let schema = schemaWith(["foo", Joi.ref("_id")])
    let value = {
      '@id': '/',
      _id: 'abc123'
    }
    let result = Joi.validate(value, schema, {
      context: value
    })
    expect(result).to.be.object()
    expect(result.error).to.be.null()
    expect(result.value).to.be.object()
    expect(result.value['@id']).to.be.equal('/foo/abc123')
    done()
  })
  it("should throw an error when link is not valid", (done) => {
    let schema = schemaWith("/$foo")
    let value = {
      '@id': 'fooo',
      _id: 'abc123',
      test: "bar"
    }
    let result = Joi.validate(value, schema, {
      context: value
    })
    expect(result).to.be.object()
    expect(result.error).to.be.object()
    done()
  })
})
