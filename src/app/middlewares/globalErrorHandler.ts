import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "";
  let errorDetails: any = "";

  if (error.name === "ZodError") {
    errorDetails = error;
    errorMessage = "Validation Error";
  } else if (error.name === "ValidationError") {
    errorDetails = error.errors;
    errorMessage = "ValidationError";
  } else if (error instanceof Error) {
    errorMessage = error.message;
    statusCode = httpStatus.BAD_REQUEST;
  } else {
    errorDetails = error;
    errorMessage = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === "development" ? error?.stack : error?.stack,
  });
};

export default globalErrorHandler;
