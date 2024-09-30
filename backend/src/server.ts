import express from "express";
import corsMiddleware from "./middleware/cors";
import courseRouter from "./routes/courses";
import YAML from "yamljs";
import path from "path";
const yamlPath = path.join(".", "/src/config/swagger.yaml");
const yaml = YAML.load(yamlPath);
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(yaml));
app.use("/api/v1", courseRouter);

export default app;
