import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { reviewControllers } from "./review.controller";
import { reviewValidationSchemas } from "./review.validation";

const router = Router();

router.post(
  "",
  validateRequest(reviewValidationSchemas.reviewCreateValidationSchema),
  reviewControllers.createReview
);

router.get("", reviewControllers.getAllReviews);

export const ReviewRoutes = router;
