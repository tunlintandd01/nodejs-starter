const client = require('../surveyClient')

describe('survey client', () => {
  test('test healthcheck request should be succeed', async () => {
    const res = await client.healthcheck()
    console.log(res.data)
  })
  test('test get survey request should be failed', async () => {
    const res = await client.getSurvey(123)
    console.log(res.data)
  })
})
