import { Router } from "express";
import { getCourseController } from "../controllers/courses";

const courseRouter = Router();
courseRouter.get("api/v1/courses", getCourseController);

export default courseRouter;
