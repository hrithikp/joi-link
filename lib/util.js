const _ = require('lodash')
const Joi = require('joi')
exports.fillWith = function fillWith (context, part) {
  if (_.isFunction(part)) {
    return part(context)
  } else {
    return part
  }
}
exports.withRefs = function withRefs (part) {
  let id = /^\$/
  if (!id.test(part)) {
    return part
  } else {
    return Joi.ref(part.replace(id, ''))
  }
}
