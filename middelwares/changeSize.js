const Jimp = require('jimp')

const changeSize = async(req, res, next) => {
  const { path: tempDir } = req.file

  console.log(req.file)

  Jimp.read(tempDir)
    .then(image => {
      return image
        .resize(250, 250)
    })
    .then(() => {
      next()
    })
    .catch(error => {
      next(error)
    })
}

module.exports = changeSize
