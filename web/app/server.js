const express = require('express')
const path = require('path')
const router = require('./router')
const logger = require('./middleware/logger')

const app = express()
const port = 80

app.use(logger)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)
app.use((req, res) => res.status(404).send())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(port)
