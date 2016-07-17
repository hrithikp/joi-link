const _ = require('lodash')
const Joi = require('joi')
const Util = require('./util')
const Link = require('./rule')
module.exports = {
  base: Joi.string(),
  name: 'string',
  language: {
    link: 'needs to be a valid link'
  },
  pre (value, state, options) {
    if (this._flags.pattern) {
      return this._flags.pattern
    } else {
      return []
    }
    // return value
  },
  rules: [Link]
}
