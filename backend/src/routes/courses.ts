import { Router } from "express";
import { getCourseController } from "../controllers/courses";

const courseRouter = Router();
courseRouter.get("/courses", getCourseController);

export default courseRouter;
