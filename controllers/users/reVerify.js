const { nanoid } = require('nanoid')
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
  }
  const user = await User.findOne({ email })
  if (user.verify) {
    res.json(
      {
        message: 'Verification has already been passed',
        code: 400,
      }
    )
  }
  const verifyToken = nanoid()
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

module.exports = reVerify
