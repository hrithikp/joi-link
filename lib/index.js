const _ = require('lodash')
const Joi = require('joi')
const Href = require('./rule')
module.exports = {
  base: Joi.string(),
  name: 'link',
  language: {
    href: 'needs to be a valid link'
  },
  pre (value, state, options) {
    if (this._flags.href) {
      return this._flags.href.map(function (v) {
        return Joi.isRef(v) ? v(state.parent, options) : v
      }).join('/')
    } else {
      return value
    }
  },
  rules: [Href]
}