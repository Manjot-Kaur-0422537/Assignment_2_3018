import express from "express";
import morgan from "morgan";
import routes from "./api/v1/routes/routes";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/v1", routes);

export default app;
