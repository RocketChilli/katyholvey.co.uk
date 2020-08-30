const os = require('os')
const nodemailer = require('nodemailer')

const controller = async (req, res) => {
  const message = {
    to: process.env.CONTACT_EMAIL,
    sender: process.env.SENDER_EMAIL,
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Proofreading enquiry',
    text: `${req.body.message}\n\nName: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}`,
  }

  // Add any files as attachments
  if (req.files.length > 0) {
    message.attachments = req.files.map(file => ({
      path: file.path,
      filename: file.originalname,
    }))
  }

  const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }

  // Enable DKIM signature for sender authentication
  if (process.env.DKIM_KEY && process.env.DKIM_SELECTOR) {
    config.dkim = {
      domainName: process.env.SENDER_EMAIL.split('@')[1],
      keySelector: process.env.DKIM_SELECTOR,
      privateKey: process.env.DKIM_KEY,
      cacheDir: os.tmpdir(),
    }
  }

  const transport = nodemailer.createTransport(config)

  try {
    await transport.sendMail(message)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(400)
  }
}

module.exports = controller
