const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already registered')
  }

  const avatarURL = gravatar.url(email)
  const verifyToken = nanoid()
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ email, password: hashPassword, avatarURL, verifyToken })
  const mail = {
    to: email,
    subject: 'Подтвердите регитрацию',
    html: `<a targer='_blank' href="http://localhost:3000/api/users/verify/${verifyToken}"> Нажмите для подтверждения email</a>`
  }
  sendEmail(mail)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success'
  })
}

module.exports = register
