const express = require('express')
const path = require('path')
const router = require('./router')

const app = express()
const port = 3000

app.use('/', router)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(port)
