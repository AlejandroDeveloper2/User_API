import express from "express";
import cors from "cors";

import { UserRouter } from "@routes/user.route";

import errorHandler from "@middleware/errorHandler";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(UserRouter);

app.use(errorHandler);

export default app;
