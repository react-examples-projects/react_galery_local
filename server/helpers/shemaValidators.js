const Joi = require("joi");

const imageSchemaValidator = Joi.object({
  "files[]": Joi.alternatives().try(
    Joi.string().required(),
    Joi.array().required()
  ),
});

const commentShemaValidator = Joi.object({
  id_post: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  username: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.string().required(),
});

module.exports = {
  imageSchemaValidator,
  commentShemaValidator,
};
