const { Contact } = require('../models')
// const CreateError = require('http-errors')

// const { response } = require('express')

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({})
  // const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    contacts
  })
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json(
    {
      status: 'success',
      code: 200,
      contact
    })
}

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

const remove = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  // const result = await contactsOperations.removeContact(Number(contactId))
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `contact with id = ${contactId} not found`
    })
    return
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    message: `contact with id = ${contactId} successfully deleted`,
  })
}

const updateById = async (req, res,) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  )
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  })
}

const updateFavorite = async (req, res,) => {
  if (req.body.favorite === undefined) {
    res.status(400).json({
      status: 'error',
      code: 404,
      message: 'missing field favorite'
    })
    return
  }
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  })
}
module.exports = {
  getAll,
  getById,
  add,
  remove,
  updateById,
  updateFavorite
}
