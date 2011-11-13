
express = require 'express'
restler = require 'restler'
config = require './config'

app = express.createServer()
app.use express.bodyParser()

app.get "/", (req, res) =>
  res.sendfile "#{__dirname}/index.html"

app.all "#{config.apiPath}*", (req, res) => 
  console.log "REQUEST: ", req.url, req.body || "no body"
 
  data = JSON.stringify(req.body)

  restOptions =
    username:  config.applicationID
    password:  config.masterKey
    data:      data
    method:    req.method.toLowerCase()
    headers:
      'Content-Type':  'application/json'
      'Content-Length': data?.length || 0
  
  complete = (data) => 
    console.log "COMPLETE: ", data
    res.json JSON.parse(data)
  
  error = (data, res) =>
    console.log "FAILURE: ", data, res
  
  restler.request("https://api.parse.com/1/classes/#{req.url.replace(config.apiPath, '')}", restOptions)
    .on("complete", complete)
    .on("error", error)
    
app.get "/*", (req, res) =>
  console.log "REQUESTING: ", req.url
  res.sendfile "#{__dirname}#{req.url}"
    
port = process.env.PORT || config.port
app.listen port

console.log "Server started on #{port}"
