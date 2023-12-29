import { Router } from "express";
import { CategoryRoutes } from "../modules/category/category.route";
import { CourseRoutes } from "../modules/course/course.route";
import { ReviewRoutes } from "../modules/review/review.route";

const router = Router();

const moduleRoutes = [
  {
    path: "",
    routes: CourseRoutes,
  },
  {
    path: "/categories",
    routes: CategoryRoutes,
  },
  {
    path: "/reviews",
    routes: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
