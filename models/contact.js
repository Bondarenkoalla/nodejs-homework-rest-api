const { Schema, model } = require('mongoose')
const Joi = require('joi')
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Set emphoneail for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true },)

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(3).required(),
  favorite: Joi.bool().default(false),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema
}
