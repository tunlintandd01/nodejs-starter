var app = require('express')()
var path = require('path')
var fs = require('fs')
var http = require('http')
var https = require('https')
var privateKey = fs.readFileSync('01pasolution.hktester.com.key', 'utf8')
var certificate = fs.readFileSync('01pasolution.hktester.com.crt', 'utf8')
var credentials = { key: privateKey, cert: certificate }
var cors = require('cors')

app.use(cors())

var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)
var PORT = 80
var SSLPORT = 443

httpServer.listen(PORT, function() {
  console.log('HTTP Server is running on: http://localhost:%s', PORT)
})
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})

// Welcome
app.get('/', function(req, res) {
  if (req.protocol === 'https') {
    res.status(200).send('Welcome to Safety Land!')
  } else {
    res.status(200).send('Welcome!')
  }
})

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
