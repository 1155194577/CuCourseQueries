import { Router } from "express";
import { getCourseController } from "../controllers/courses";
import { getCoursesIdController } from "../controllers/coursesId";

const courseRouter = Router();
courseRouter.get("/courses", getCourseController);
courseRouter.get("/coursesId", getCoursesIdController);
export default courseRouter;
