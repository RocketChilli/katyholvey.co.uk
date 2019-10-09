const express = require('express')
const home = require('./controllers/home')
const blog = require('./controllers/blog')
const mailer = require('./controllers/mailer')

const router = express.Router()
router.get('/', home)
router.get('/blog', blog)
router.post('/mailer', mailer)

module.exports = router
