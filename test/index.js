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
    "@id": Joi.link().href(link),
    "test": Joi.link()
  }).options({
    stripUnknown: true
  })
}
const value = {
  '@id': '/',
  _id: 'abc123',
  test: "test"
}
describe('Joi.link().href(value) - builds and validates a link value.', () => {
  it('value can be a non-empty array of strings or refs.', (done) => {
    let schema = schemaWith(["foo", Joi.ref("_id")])
    let result = Joi.validate(value, schema, {
      context: value
    })
    expect(result).to.be.object()
    expect(result.error).to.be.null()
    expect(result.value).to.be.object()
    expect(result.value['@id']).to.equal('/foo/abc123')
    expect(result.value.test).to.equal('test')
    done()
  })
  it("should throw an error when link is not valid", (done) => {
    let schema = schemaWith([Joi.ref("$foo")])
    let result = Joi.validate(value, schema, {
      context: value
    })
    expect(result).to.be.object()
    expect(result.error).to.be.object()
    done()
  })
})
