const { celebrate, Joi } = require("celebrate");

const {
  emailSchema,
  passwordSchema,
  textSchema,
  linkSchema,
  objectIdSchema
} = require("./schemasJoi");

const registrationCheckSchema = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
    name: textSchema,
    about: textSchema,
    avatar: linkSchema
  })
});

const loginCheckSchema = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema
  })
});

const userInfoCheckSchema = celebrate({
  body: Joi.object().keys({
    name: textSchema,
    about: textSchema
  })
});

const userAvatarCheckSchema = celebrate({
  body: Joi.object().keys({
    avatar: linkSchema
  })
});

const idCheckSchema = celebrate({
  params: Joi.object().keys({
    id: objectIdSchema
  })
});

const cardCheckSchema = celebrate({
  body: Joi.object().keys({
    name: textSchema,
    link: linkSchema
  })
});

module.exports = {
  registrationCheckSchema,
  loginCheckSchema,
  userInfoCheckSchema,
  userAvatarCheckSchema,
  idCheckSchema,
  cardCheckSchema
};
