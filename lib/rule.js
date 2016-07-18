const _ = require('lodash')
const Joi = require('joi')
module.exports = {
  name: 'href',
  params: {
    href: Joi.array().items(
      Joi.string(), 
      Joi.func().ref()
    ).min(1)
  },
  setup (params) {
    params.href = [''].concat(params.href)
    this._flags.href = params.href
  },
  validate (params, value, state, options) {
    let parts = value.split('/').slice(1)
    if (!parts.every((p) => _.size(p) > 0)) {
      return this.createError('link.href', { v: value }, state, options)
    } else {
      return value
    }
  }
}
