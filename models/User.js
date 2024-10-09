import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
    phone :{
      type : Number,

    },
    address: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
