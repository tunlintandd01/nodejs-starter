'use strict'

const _ = require('lodash')

const ajv = require('../validators/ajv')
const requireDirectory = require('../../utils/requireDir')

module.exports = requireDirectory(module, {
  exclude: /\/__(tests|mocks|fixtures)__\//,
  visit: schema => {
    const schemaId =
      schema.$id ||
      _.get(schema, '$merge.source.$id') ||
      _.get(schema, '$merge.with.$id')
    if (!schemaId) {
      throw new Error(`Schema id is missing in ${JSON.stringify(schema)}`)
    }

    ajv.addSchema(schema, schemaId)

    return {
      getErrors: () => ajv.errors,
      getErrorsText: () => JSON.stringify(ajv.errors, null, 2),
      validate: data => ajv.validate(schemaId, data),
    }
  },
})
