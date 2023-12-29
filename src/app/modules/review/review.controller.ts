import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review is created successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews are retrieved successfully",
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getAllReviews,
};
