'use strict'

const _ = require('lodash')
const Koa = require('koa')
const http = require('http')
const koaLogger = require('koa-logger')
const koaBodyParser = require('koa-bodyparser')
const koaCompose = require('koa-compose')
const routers = require('./routers')
const middlewares = require('./middlewares')

const routes = _.map(routers, router => {
  return router.routes()
})

module.exports.createApiServer = async options => {
  const app = new Koa()

  app
    .use(koaLogger())
    .use(middlewares.errorHandler)
    .use(koaBodyParser())
    .use(koaCompose(routes))

  const server = http.createServer(app.callback())
  return server
}
