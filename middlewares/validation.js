const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2 characters',
      "string.max": 'The maximum length of the "name" field is 30 characters',
      "string.empty": 'The "name" field cannot be empty',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only": "Weather must be one of: hot, warm, cold",
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field cannot be empty',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field cannot be empty',
      "string.url": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" is required',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must not be empty',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field is required',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.length": "ID must be 24 characters long",
      "string.hex": "ID must be a hexedecimal string",
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2 characters',
      "string.max": 'The maximum length of the "name" field is 30 characters',
      "string.empty": 'The "name" field cannot be empty',
      "any.required": 'The "name" field is required',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field cannot be empty',
      "string.uri": 'The "avatar" field must be a valid URL',
      "any.required": 'The "avatar" field is required',
    }),
  })
})

module.exports = {
  validateCardBody,
  validateUserBody,
  validateLogin,
  validateId,
  validateUserUpdate,
};
