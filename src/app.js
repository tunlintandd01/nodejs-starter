'use strict'

const Koa = require('koa')

module.exports.createApiServer = async options => {
  const app = new Koa()

  app.use(async ctx => {
    ctx.body = { pascal: 'lin' }
  })

  return app
}
