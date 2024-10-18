import { Router } from "express";
import { uploadImage } from "../controllers/image.js";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";

const Imagerouter = Router();
const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : 'image',
        format : 'png',
    }
})

const upload = multer({storage: storage})

Imagerouter.post("/upload",upload.array('images', 10),  uploadImage);

export default Imagerouter