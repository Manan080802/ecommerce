
import httpStatus from "http-status"
import ApiError from "../util/ApiError.js";
import Utils from"../util/response.js"

export const errorConverter = async (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || error instanceof Error
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      const messageCode = error.messageCode || "";
      const result = error.result || {};
      error = new ApiError(statusCode, message, messageCode, result);
    }
    next(error);
  };
export const errorHandler = (err, req, res, next) => {
    const { statusCode, message, messageCode, result } = err;
  
    res.locals.errorMessage = err.message;
    return res
      .status(statusCode || httpStatus.BAD_GATEWAY)
      .send(Utils.error(result, message, messageCode));
  };
