const os = require('os')
const express = require('express')
const formData = require('express-form-data')
const home = require('./controllers/home')
const blog = require('./controllers/blog')
const mailer = require('./controllers/mailer')
const page = require('./controllers/page')

const parser = formData.parse({
  uploadDir: os.tmpdir(),
  autoClean: true,
})

const router = express.Router()
router.get('/', home)
router.get('/blog', blog)
router.get('/:slug', page)
router.post('/mailer', [parser, mailer])

module.exports = router
