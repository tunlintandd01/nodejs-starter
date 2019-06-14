'use strict'

const _ = require('lodash')
const Boom = require('@hapi/boom')

const customErrorMapping = require('../constants').customErrorMapping
const logger = require('../utils/logger')

const getBoomError = (originalError, ctx) => {
  const boomPayload = getBoomPayload(originalError)

  // handle unexpected error
  if (!boomPayload.statusCode || !originalError.isBoom) {
    logger.error(
      `Internal error: user(${ctx.userId}), path(${ctx.request.path}) \n ${
        originalError.stack
      }`
    )

    return Boom.badImplementation()
  }

  return originalError
}

const getBoomPayload = boomError => {
  return _.get(boomError, 'output.payload', {})
}

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error.stack)

    // handle custom error throw
    const customError = customErrorMapping[error.message]
    if (customError) {
      logger.trace('throw custom error')
      const customErrorCode = Number(error.message)

      ctx.response.status = customError.statusCode
      ctx.response.body = {
        error: {
          code: customErrorCode,
          message: customError.message,
        },
      }
      return
    }

    // handler boom error
    if (error.isBoom) {
      logger.trace('throw boom error')
      const boomError = getBoomError(error, ctx)
      const boomPayload = getBoomPayload(boomError)

      ctx.response.status = boomPayload.statusCode
      ctx.response.body = {
        error: {
          code: boomPayload.statusCode,
          message: boomPayload.message || boomPayload.error,
        },
      }
      // ctx.response.body = JSON.stringify(boomPayload.message || boomPayload.error)
      return
    }

    // handle ctx.throw()
    if (error.status) throw error
  }
}
