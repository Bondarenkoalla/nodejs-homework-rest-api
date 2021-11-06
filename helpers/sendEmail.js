const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const { SG_KEY } = process.env
sgMail.setApiKey(SG_KEY)

const sendEmail = async (data) => {
  const email = { ...data, from: ' bondarenkoalla961@gmail.com' }
  await sgMail.send(email)
}

module.exports = sendEmail
