'use strict'

const axios = require('axios')
const config = require('../../config')

class SurveyClient {
  constructor({ baseURL, token, timeout = 10000 }) {
    this.axios = axios.create({
      baseURL,
      timeout,
      headers: {
        authorization: `bearer ${token}`,
      },
    })
  }

  async healthcheck() {
    return this.axios.get('/healthcheck')
  }

  async putUser(user) {
    return this.axios.put('/users', user)
  }

  async getSurvey(surveyId) {
    return this.axios.get(`/surveys/${surveyId}`)
  }

  async getSurveyQuestions(surveyId) {
    return this.axios.get(`/surveys/${surveyId}/questions`)
  }

  async getSurveyRollups(surveyId) {
    return this.axios.get(`/surveys/${surveyId}/rollups`)
  }

  async getSurveyResponses(surveyId, user) {
    return this.axios.get(`/surveys/${surveyId}/responses`, {
      params: user,
    })
  }

  async postSurveyResponses(surveyId, user, requestPayload) {
    return this.axios.post(`/surveys/${surveyId}/responses`, {
      surveyResponse: requestPayload,
      user,
    })
  }
}

// TODO: user token logic
module.exports = new SurveyClient({
  baseURL: config.get('services.survey.baseURL'),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImhrZGV2IiwiYWNjb3VudElkIjoxMTU3MzAxLCJleHAiOjE1NTg4MzY0NjYsImlzcyI6InN0YWdpbmcuaGswMXNzby5jb20iLCJpYXQiOjE1NTg1NzcyNjd9.rGxeTUmvV2duhj3kTrzRMVdVRRv_H-tSq5dQZfVGpyA',
})
