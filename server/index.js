import cors from "cors";
import express from "express";
import router from "./routes/index.js";
import { errorHandler, errorHandlerNotFound } from "./utils/errorHandler.js";

import { PORT } from "./utils/env.js";
import connect from "./utils/connect.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

connect();
app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT || 8000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});