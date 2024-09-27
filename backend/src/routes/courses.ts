import { Router } from "express";
import { getCourseController } from "../controllers/courses";
import { getCoursesIdController } from "../controllers/coursesId";
import { postQueryController } from "../controllers/query";

const courseRouter = Router();
courseRouter.get("/courses", getCourseController);
courseRouter.get("/coursesId", getCoursesIdController);
courseRouter.post("/queries", postQueryController);
export default courseRouter;
