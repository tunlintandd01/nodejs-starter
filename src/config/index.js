'use strict'

const _ = require('lodash')
// default is "development" environment
const envConfig = require(`./config.${process.env.NODE_ENV || 'development'}`)
const commonConfig = require('./config.common')
module.exports = _.merge(commonConfig, envConfig)
