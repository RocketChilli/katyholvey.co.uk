'use strict'

const express = require('express')
const router = require('./controllers/router')

const app = express()
const port = 3000

app.use('/', router)
app.set('view engine', 'ejs')

app.listen(port)
