const { createApiServer } = require('./app')

async function main() {
  const app = await createApiServer()
  app.listen(3000)
}

main()
