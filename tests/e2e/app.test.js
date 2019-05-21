const { createApiServer } = require('../../src/app')
const supertest = require('supertest')

let app

beforeAll(async () => {
  app = await createApiServer()
  app.listen(3000)
})
afterAll(() => {
  app.close()
})

test('server test', async () => {
  const res = await supertest(app)
    .get('/api/survey?id=1')
    .expect(200)
  expect(res.body.msg).toEqual('survey')
})
