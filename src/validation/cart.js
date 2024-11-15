import Joi from "joi"

export const addToCartSchema = {
    body: Joi.object().keys({
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required()
    }),
  };
  