import Joi from "@hapi/joi";

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(data);
};

const registerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(5).max(90).required(),
    profileDisplay: Joi.optional(),
  });

  return schema.validate(data);
};

export { loginValidation, registerValidation };
