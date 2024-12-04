// models/comment.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    star: { type: Number, required: true },
    stt: { type: String,},
    show: { type: String,default:"show"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;