const morgan = require('morgan')

const logger = (req, res, next) => {
  const format = process.env.NODE_ENV === 'development' ? 'dev' : 'tiny'
  morgan(format)(req, res, next)
}

module.exports = logger
