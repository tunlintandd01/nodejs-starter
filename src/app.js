'use strict'

const express = require('express')
const cors = require('cors')

module.exports.createApiServer = async options => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/', async (req, res) => {
    res.json({ pascal: 'lin' })
  })

  return app
}
