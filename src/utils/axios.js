const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports = (clientId, secret) => {
  const jwtToken = jwt.sign({ clientId }, secret, {
    algorithm: 'HS256',
    expiresIn: '30s',
  })
  return axios.create({
    headers: {
      'HK01-Auth-Schema': 'API',
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
