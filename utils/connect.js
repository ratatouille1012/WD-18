import mongoose from "mongoose";
import { DB_URI } from "./env.js";
const connect = () => {
  mongoose
    .connect(`mongodb://localhost:27017/${DB_URI}`)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;
