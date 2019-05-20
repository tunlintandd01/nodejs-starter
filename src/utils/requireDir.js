'use strict'

const requireDirectory = require('require-directory')

module.exports = (
  m,
  opt = {
    exclude: /\/__(tests|mocks|fixtures)__\//,
  }
) => requireDirectory(m, opt)
