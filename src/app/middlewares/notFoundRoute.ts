import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    errorMessage: "API not found!",
    errorDetails: {
      errorCode: httpStatus.NOT_FOUND,
      description: "API Not Found !!",
    },
  });
};

export default notFoundRoute;
