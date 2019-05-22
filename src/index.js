const { createApiServer } = require('./app')
const config = require('./config')
const logger = require('./utils/logger')

async function main() {
  const app = await createApiServer()
  const port = config.get('port')
  app.listen(port)
  logger.debug(`server listening to ${port}...`)
}

main()
