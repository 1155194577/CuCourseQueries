import { Router } from "express";
import { getCourseController } from "../controllers/courses";
import { getCoursesIdController } from "../controllers/coursesId";
import { example_controller } from "../controllers/example_controller";

const courseRouter = Router();
courseRouter.get("/courses", getCourseController);
courseRouter.get("/coursesId", getCoursesIdController);
courseRouter.get("/example", example_controller);
export default courseRouter;
