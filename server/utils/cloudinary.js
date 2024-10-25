import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cấu hình Cloudinary
cloudinary.v2.config({
    cloud_name: "dhl9offsc",
    api_key: "814536668681882",
    api_proxy : "111111111",
    api_secret: 'AbldWIhl8rAnm3TJnl5wwrn4458'
});

// Cấu hình lưu trữ cho Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'products', // Thư mục lưu trữ ảnh trong Cloudinary
    allowed_formats: ['jpg', 'png'], // Định dạng ảnh cho phép
  },
});

export { cloudinary, storage };