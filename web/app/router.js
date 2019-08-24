const express = require('express')
const home = require('./controllers/home')
const mailer = require('./controllers/mailer')

const router = express.Router()
router.get('/', home)
router.post('/mailer', mailer)

module.exports = router
