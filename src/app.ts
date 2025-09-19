import express from "express";
import morgan from "morgan";
import routes from "./api/v1/routes";

const app = express();
app.use(express.json());

app.use(morgan("combined"));

app.use("/api/v1", routes);

export default app;
