import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseControllers } from "./course.controller";
import { courseValidationSchemas } from "./course.validation";

const router = Router();

router.post(
  "/course",
  validateRequest(courseValidationSchemas.courseCreateValidationSchema),
  courseControllers.createCourse
);
router.get("/courses", courseControllers.getAllCourses);
router.get("/courses/:courseId", courseControllers.getSingleCourse);

router.put(
  "/courses/:id",
  validateRequest(courseValidationSchemas.courseUpdateValidationSchema),
  courseControllers.updateCourse
);

router.get(
  "/courses/:courseId/reviews",
  courseControllers.getCourseWithReviews
);

router.get("/course/best", courseControllers.getBestCourseBasedOnReview);

export const CourseRoutes = router;
