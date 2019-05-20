'use strict'

const ajvMergePatch = require('ajv-merge-patch')
const Ajv = require('ajv')

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  removeAdditional: true,
  useDefaults: true,
})
ajvMergePatch(ajv)

module.exports = ajv
