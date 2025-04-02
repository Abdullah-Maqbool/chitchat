const Joi = require("joi");

const initialSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(16).required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const regSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9._\-]{5,16}$/)
    .required(),
  displayName: Joi.string()
    .pattern(/^[a-zA-Z\s]{1,24}$/)
    .required(),
  avatar: Joi.string()
    .pattern(/^\/[\w-]+\.(jpg|jpeg|png|webp)$/i)
    .required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(16).required(),
});

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(16).required(),
});

const resetEmailSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const resetUsernameSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9._\-]{5,16}$/)
    .required(),
});

module.exports = {
  initialSchema,
  regSchema,
  authSchema,
  resetEmailSchema,
  resetUsernameSchema,
};
