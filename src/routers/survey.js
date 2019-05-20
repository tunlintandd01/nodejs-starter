'use strict'

const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
})
const { getControllerCallback } = require('../utils/route')
const middlewares = require('../middlewares')

router.get('getSurvey', '/survey')

router.use(middlewares.validateJSONSchema, getControllerCallback)

module.exports = router
