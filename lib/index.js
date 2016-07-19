const _ = require('lodash')
const Joi = require('joi')
const Href = require('./rule')
module.exports = {
  base: Joi.any(),
  name: 'link',
  language: {
    href: 'needs to be a valid link'
  },
  pre (value, state, options) {
    const isVector = _.isPlainObject(value) || _.isArray(value)
    const data = isVector ? value : state.parent
    const href = this._flags.href || []
    function prepare(v) {
      if (Joi.isRef(v)) {
        return v.key === '%self' ? value.toString() : v(data, options) 
      }
      return v
    }
    return _.isEmpty(href) ? value : href.map(prepare).join('/')
  },
  rules: [Href]
}
