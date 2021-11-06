const { NotFoun } = require('http-errors')
const { sendEmail } = require('../../helpers')
const { User } = require('../../models')
const reVerify = async (req, res) => {
  const { email } = req.body
  if (!email) {
    res.json(
      {
        message: 'missing required field email',
        code: 400,
      }
    )
    return
  }
  const user = await User.findOne({ email })
  if (user.verify) {
    res.json(
      {
        message: 'Verification has already been passed',
        code: 400,
      }
    )
    return
  }
  if (!user) {
    throw NotFoun()
  }
  const mail = {
    to: email,
    subject: 'Подтвердите регитрацию',
    html: `<a targer='_blank' href="http://localhost:3000/api/users/verify/${user.verifyToken}"> Нажмите для подтверждения email</a>`
  }
  sendEmail(mail)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Email success verify'
  })
}

module.exports = reVerify
