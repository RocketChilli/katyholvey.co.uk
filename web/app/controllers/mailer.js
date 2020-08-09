const nodemailer = require('nodemailer')

const controller = (req, res) => {
  const message = {
    to: process.env.CONTACT_EMAIL,
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Proofreading enquiry',
    text: `${req.body.message}\n\nName: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}`,
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  transport.sendMail(message)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error(error)
      res.sendStatus(400)
    })
}

module.exports = controller
