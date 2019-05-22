'use strict'

const convict = require('convict')
const path = require('path')
const yaml = require('js-yaml')

convict.addParser({
  extension: 'yml',
  parse: yaml.safeLoad,
})

const config = convict(path.join(__dirname, 'configSchema.yml'))
const env = config.get('env')

config.loadFile([
  path.join(__dirname, `${env}.yml`),
  path.join(__dirname, `credentials.${env}.yml`),
])

config.validate({ allowed: 'warn' })

module.exports = config
