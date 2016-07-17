const _ = require('lodash')
const Joi = require('joi')
const Util = require('./util')
module.exports = {
  name: 'link',
  params: {
    pattern: Joi.alternatives([Joi.string().required(),
      Joi.array().items([
        Joi.string().required(),
        Joi.func().ref()
      ]).min(1)
    ])
  },
  setup (params) {
    this._flags.pattern = clean(params.pattern)
  },
  validate (params, value, state, options) {
    value = value.map(_.partial(Util.fillWith, options.context))
    if (!value.slice(1).every((v) => _.size(v) > 0)) {
      return this.createError('string.link', { v: value.join('/') }, state, options)
    } else {
      return value.join('/')
    }
  }
}
function clean (pattern) {
  if (_.isString(pattern)) {
    pattern = pattern.split('/')
    pattern = pattern.map(Util.withRefs)
  } else {
    pattern = [''].concat(pattern)
  }
  return pattern
}
