import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is created successfully",
    data: result,
  });
});

const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const { result, meta } = await courseServices.getAllCoursesFromDB(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses are retrieved successfully",
    meta,
    data: result,
  });
});

const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getSingleCourseFromDB(courseId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCourseToDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is updated successfully",
    data: result,
  });
});

const getCourseWithReviews: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getCourseWithReviewsFromDB(courseId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course with reviews is retrieved successfully",
    data: result,
  });
});

const getBestCourseBasedOnReview: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await courseServices.getBestCourseBasedOnReviewFromDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "The best course based on average rating is retrieved successfully",
      data: result,
    });
  }
);

export const courseControllers = {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  getCourseWithReviews,
  getBestCourseBasedOnReview,
};
