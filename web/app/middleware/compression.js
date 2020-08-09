const compression = require('compression')

const compressionMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    next()
    return
  }

  compression()(req, res, next)
}

module.exports = compressionMiddleware
