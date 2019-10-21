const sendmail = require('sendmail')()

const controller = (req, res) => {
  const message = {
    to: process.env.CONTACT_EMAIL,
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Proofreading enquiry',
    text: `${req.body.message}\n\nName: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}`,
  }

  sendmail(message, (error) => {
    if (error) {
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
}

module.exports = controller
