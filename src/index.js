const { createApiServer } = require('./app')
const config = require('./config')

async function main() {
  const app = await createApiServer()
  app.listen(config.port)
}

main()
