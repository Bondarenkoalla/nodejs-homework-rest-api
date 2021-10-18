const express = require('express')
const router = express.Router()
const { controllerWrapper, validation } = require('../../middelwares')
// const { contactSchema } = require('../../schemas')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.remove))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateFavorite))

module.exports = router
