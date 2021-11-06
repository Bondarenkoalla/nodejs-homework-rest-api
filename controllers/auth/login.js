const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../../models')
const { SECRET_KEY } = process.env
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const isCorrectPassword = bcrypt.compareSync(password, user.password)
  if (!user || !user.verify || !isCorrectPassword) {
    throw new Unauthorized('Email or password is wrong or email is not verify')
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: { token }
  })
}
module.exports = login
