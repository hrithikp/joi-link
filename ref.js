var Joi = require('joi').extend(require('./index'))
function linkify(parts) {
  parts = [''].concat(parts)
  function _link(context) {
    return parts.map((p) => {
      return Joi.isRef(p) ? p(context) : p
    }).join('/')
  }
  _link.description = 'Builds a link based on passed params'
  return _link
}
module.exports = linkify