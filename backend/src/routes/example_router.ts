import { Router } from "express";
import { example_controller } from "../controllers/example_controller";

const exampleRouter = Router();

exampleRouter.get("/", example_controller);

export default exampleRouter;
