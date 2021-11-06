const express = require('express')
const { controllerWrapper, authenticate, upload, changeSize } = require('../../middelwares')

const { users: ctrl } = require('../../controllers')
const router = express.Router()

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))
router.post('/verify/', controllerWrapper(ctrl.reVerify))
router.patch('/avatars', authenticate, upload.single('avatar'), changeSize, controllerWrapper(ctrl.updateAvatar))

module.exports = router
