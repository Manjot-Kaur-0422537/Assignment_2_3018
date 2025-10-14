import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  position: Joi.string().required(),
  email: Joi.string().email().required(),
  branchId: Joi.string().required(),
});
