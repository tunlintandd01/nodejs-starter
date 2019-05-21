'use strict'

// this function intends to replace ctx._matchedRouteName because of the following issue:
// https://github.com/alexmingoia/koa-router/issues/246
function getRouteName(ctx) {
  const matchedRoute = ctx.matched
    .filter(layer => layer.opts.end === true) // filter koa-router prefix layer
    .find(layer => layer.methods.indexOf(ctx.method) >= 0)
  return matchedRoute ? matchedRoute.name : null
}
module.exports.getRouteName = getRouteName

const controllers = require('../controllers')

module.exports.getControllerCallback = async ctx => {
  const routeName = getRouteName(ctx)

  if (!routeName) throw new Error('missing routeName')

  const controller = controllers[routeName]
  if (!controller) throw new Error('missing controller')

  await controller(ctx)
}
