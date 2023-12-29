import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categoryControllers } from "./category.controller";
import { categoryValidationSchemas } from "./category.validation";

const router = Router();

router.post(
  "",
  validateRequest(categoryValidationSchemas.categoryCreateValidationSchema),
  categoryControllers.createCategory
);

router.get("", categoryControllers.getAllCategory);
router.get("/:id", categoryControllers.getSingleCategory);

export const CategoryRoutes = router;
