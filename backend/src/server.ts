import express from "express";
// import exampleRouter from "./routes/example_router";
import corsMiddleware from "./middleware/cors";
import courseRouter from "./routes/courses";
import YAML from "yamljs";
// import { paths } from "./constant/paths";
// const yaml = YAML.load(`${paths.configFolder}/swagger.yaml`);
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(yaml));
app.use("/api/v1", courseRouter);

export default app;
