const os = require('os')
const express = require('express')
const multer = require('multer')
const home = require('./controllers/home')
const blog = require('./controllers/blog')
const mailer = require('./controllers/mailer')
const page = require('./controllers/page')

const parser = multer({ dest: os.tmpdir() }).array('files[]')

const router = express.Router()
router.get('/', home)
router.get('/blog', blog)
router.get('/:slug', page)
router.post('/mailer', [parser, mailer])

module.exports = router
