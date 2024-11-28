// routes/comment.routes.js
import {Router} from "express";
import {
  createComment,
  getCommentsByProduct,
  updateComment,
  deleteComment,
} from "../controllers/comment.js";

const Commentrouter = Router();

Commentrouter.post("/", createComment); // Tạo comment cho nhiều sản phẩm
Commentrouter.get("/:productId", getCommentsByProduct); // Lấy comment theo productId
Commentrouter.put("/:commentId", updateComment); // Cập nhật comment
Commentrouter.delete("/:commentId", deleteComment); // Xóa comment

export default Commentrouter;
