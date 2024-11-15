import Joi from "joi"

export const productSchema = {
    body: Joi.object().keys({
        name: Joi.string().min(3).trim().required(),
        price: Joi.number().positive().required().messages({
            'number.base': 'Price should be a number.',
            'number.positive': 'Price should be a positive number.',
            'any.required': 'Price is required.'
          }),
          stock_quantity: Joi.number().integer().min(0).required().messages({
            'number.base': 'Stock quantity should be a number.',
            'number.integer': 'Stock quantity should be an integer.',
            'number.min': 'Stock quantity should not be negative.',
            'any.required': 'Stock quantity is required.'
          })
    }),
  };
  