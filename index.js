import cors from "cors";
import express from "express";
import router from "./routes/index.js";
import { errorHandler, errorHandlerNotFound } from "./utils/errorHandler.js";

import { PORT } from "./utils/env.js";
import connect from "./utils/connect.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

connect();
app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT || 8000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use((err, req, res, next) => {
  console.error('Error details:', err); // Ghi lỗi chi tiết ra console
  res.status(500).json({ error: err.message || 'Internal Server Error' }); // Trả về lỗi dưới dạng JSON
});