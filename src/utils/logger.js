'use strict'

const pino = require('pino')
const isDev = process.env.NODE_ENV === 'development'

module.exports = pino({
  level: isDev ? 'debug' : 'info',
})
