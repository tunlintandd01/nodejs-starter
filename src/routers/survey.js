'use strict'

const Router = require('koa-router')
const router = new Router({
  prefix: '/v1',
})
const { getControllerCallback } = require('../utils/route')
const middlewares = require('../middlewares')

router.get('getSurvey', '/survey')
router.get('authPage', '/auth')

router.use(middlewares.validateJSONSchema, getControllerCallback)

module.exports = router
