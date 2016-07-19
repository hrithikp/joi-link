const _ = require('lodash')
const Code = require('code')
const Lab = require('lab')
const Joi = require('joi').extend(require('..'))
const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const expect = Code.expect
exports.lab = lab

const schema =  Joi.object({
  "test1": Joi.link().href(['foo', Joi.ref('_id')]),
  "test2": Joi.array().items(Joi.link().href(['foo', Joi.ref('%self')])),
  "test3": Joi.array().items(Joi.link().href(['foo', Joi.ref('id')])),
  "test4": Joi.link().href(['foo', Joi.ref('id'), Joi.ref('$_id')]),
  "test5": Joi.link().href(['foo', Joi.ref('%self')])
}).options({
  stripUnknown: true,
  allowUnknown: true
})
const value = {
  _id: 'abc123',
  test1: '/',
  test2: ["test"], // Array of scalars
  test3: [{id: 'foo'}, {id: 'make'}], // Array of objects
  test4: {id: 'bar'}, // Object
  test5: 'baz'
}
describe('Joi.link()', () => {
  it('Validates the value as linkable', (done) => {
    var result = Joi.validate('foo', Joi.link())
    expect(result.error).to.be.null()
    expect(result.value).to.be.string()
    result = Joi.validate('foo', Joi.link().href())
    expect(result.error).to.be.object()
    expect(result.value).to.equal('/')
    done()
  })
})
describe('Joi.link().href(value) - builds and validates a link value.', () => {
  it('value can be a non-empty array of strings or refs.', (done) => {
    let result = Joi.validate(value, schema, {
      context: value
    })
    expect(result).to.be.object()
    expect(result.error).to.be.null()
    expect(result.value).to.be.object()
    expect(result.value['test1']).to.equal('/foo/abc123')
    expect(result.value['test2']).to.equal(['/foo/test'])
    expect(result.value['test3']).to.equal(['/foo/foo', '/foo/make'])
    expect(result.value['test4']).to.equal('/foo/bar/abc123')
    expect(result.value['test5']).to.equal('/foo/baz')
    done()
  })
})
