import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes";
const app: Application = express();

// parser for this server
app.use(cors());
app.use(express.json());

// All routes of this server are in the routes file.
app.use("/api", router);

// Default route or home route of this server.
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Course Masters Server",
  });
});

// Global Error Handler function.
app.use(globalErrorHandler);
// Not Found Routes
app.use(notFoundRoute);

export default app;
