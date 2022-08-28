const config = require('./utils/config')
const { info } = require('./utils/logger')
const app = require('./app')
const http = require('http')
const express = require('express')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})