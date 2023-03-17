const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')
const app = require('./app')

const server = http.createServer(app)

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
