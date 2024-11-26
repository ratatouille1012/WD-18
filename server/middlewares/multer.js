import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ
const upload = multer({ storage });

export default upload;
