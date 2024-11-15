import Joi from "joi"
import constants from "../config/constants.js";

export const signUpSchema = {
    body: Joi.object().keys({
      firstName: Joi.string().min(3).trim().required(),
      lastName: Joi.string().min(3).trim().required(),
      email: Joi.string().trim().required().email(),
      gender: Joi.string()
      .trim()
      .valid(constants.MALE, constants.FEMALE, constants.OTHER)
      .required()
      .messages({
        "string.empty": "Gender is required.",
        "any.only": `Gender must be one of the following: ${constants.MALE} ${constants.FEMALE} ${constants.OTHER}`,
      }),
      phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)  // Accepts exactly 10 digits
      .message('Phone number must be exactly 10 digits')
      .required(),
      password: Joi.string()
        .min(8) // Minimum length of 8 characters
        .max(30) // Optional maximum length of 30 characters
        .pattern(new RegExp("(?=.*[a-z])")) // At least one lowercase letter
        .pattern(new RegExp("(?=.*[A-Z])")) // At least one uppercase letter
        .pattern(new RegExp("(?=.*[0-9])")) // At least one digit
        .pattern(new RegExp("(?=.*[!@#$%^&*])")) // At least one special character
        .required()
        .messages({
          "string.min": "Password must be at least 8 characters long.",
          "string.pattern.base":
            "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.",
          "any.required": "Password is required.",
        }),
    }),
  };

 export const loginSchema = {
    body: Joi.object().keys({
      email: Joi.string().trim().required().email(),
      password: Joi.string()
        .min(8) // Minimum length of 8 characters
        .max(30) // Optional maximum length of 30 characters
        .pattern(new RegExp("(?=.*[a-z])")) // At least one lowercase letter
        .pattern(new RegExp("(?=.*[A-Z])")) // At least one uppercase letter
        .pattern(new RegExp("(?=.*[0-9])")) // At least one digit
        .pattern(new RegExp("(?=.*[!@#$%^&*])")) // At least one special character
        .required()
        .messages({
          "string.min": "Password must be at least 8 characters long.",
          "string.pattern.base":
            "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.",
          "any.required": "Password is required.",
        }),
    }),
  };
  