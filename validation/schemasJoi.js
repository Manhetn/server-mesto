const { Joi } = require("celebrate");

const emailSchema = Joi.string()
  .required()
  .email();

const passwordSchema = Joi.string()
  .required()
  .min(8);

const textSchema = Joi.string()
  .required()
  .min(2)
  .max(30);

const linkSchema = Joi.string()
  .required()
  .uri();

const objectIdSchema = Joi.string()
  .alphanum()
  .length(24);

module.exports = {
  emailSchema,
  passwordSchema,
  textSchema,
  linkSchema,
  objectIdSchema
};
