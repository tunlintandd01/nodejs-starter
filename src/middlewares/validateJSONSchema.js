'use strict'

const { getRouteName } = require('../utils/route')
const jsonSchemas = require('../validation/schemas')
const logger = require('../utils/logger')

module.exports = async (ctx, next) => {
  const routeName = getRouteName(ctx)
  if (!routeName) throw new Error('missing routeName')

  const requestJsonSchema = jsonSchemas[`${routeName}Request`]
  const responseJsonSchema = jsonSchemas[`${routeName}Response`]
  if (!requestJsonSchema) throw new Error('missing request json schema')
  if (!responseJsonSchema) throw new Error('missing response json schema')

  const mutableRequestArgs = {
    params: ctx.params,
    body: ctx.request.body,
    query: ctx.request.query,
  }
  const isRequestSchemaPassed = requestJsonSchema.validate(mutableRequestArgs)
  if (!isRequestSchemaPassed) {
    logger.warn(`validation failed: ${JSON.stringify(mutableRequestArgs)}`)
    ctx.response.status = 400
    ctx.response.body = requestJsonSchema.getErrors()
    return
  }

  await next()

  const isResponseSchemaPassed = responseJsonSchema.validate(ctx.response.body)
  if (!isResponseSchemaPassed) {
    throw new Error(responseJsonSchema.getErrorsText())
  }
}
