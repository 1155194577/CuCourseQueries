import express from "express";
import exampleRouter from "./routes/example_router.js";
import corsMiddleware from "./middleware/cors.js";

const app = express();

app.use(corsMiddleware);
app.use("/api/v1", exampleRouter);

export default app;
