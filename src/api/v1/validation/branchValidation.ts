import Joi from "joi";

export const branchSchema = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});
