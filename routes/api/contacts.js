const express = require('express')
const router = express.Router()
const { controllerWrapper, validation, authenticate } = require('../../middelwares')
// const { contactSchema } = require('../../schemas')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.remove))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateFavorite))

module.exports = router
