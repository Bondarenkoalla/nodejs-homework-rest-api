const express = require('express')
const { controllerWrapper, authenticate, upload, changeSize } = require('../../middelwares')

const { users: ctrl } = require('../../controllers')
const router = express.Router()

router.patch('/avatars', authenticate, upload.single('avatar'), changeSize, controllerWrapper(ctrl.updateAvatar))

module.exports = router
