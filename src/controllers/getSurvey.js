// const Boom = require('@hapi/boom')

module.exports = async ctx => {
  // throw new Error('4001')
  // throw Boom.notFound('survey is not found')
  ctx.body = { msg: 'survey' }
}
