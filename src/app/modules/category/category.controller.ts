import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryServices } from "./category.service";

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category is created successfully.",
    data: result,
  });
});

const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories are retrieved successfully",
    data: result,
  });
});

const getSingleCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryServices.getSingleCategoryFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category is retrieved successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
};
