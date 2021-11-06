const { NotFoun } = require('http-errors')
const { User } = require('../../models')
const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verifyToken: verificationToken })
  if (!user) {
    throw NotFoun()
  }
  await User.findOneAndUpdate(user._id, { verify: true, verifyToken: null })
  res.json({
    status: 'success',
    code: 200,
    message: 'Email success verify'
  })
}

module.exports = verify
