import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cấu hình Cloudinary
cloudinary.v2.config({
    cloud_name: "dnryilnxu",
    api_key: "992449478921931",
    api_proxy : "111111111",
    api_secret: 'AbldkSvf7OZaZD4pgnA_LiZywEF1owoWIhl8rAnm3TJnl5wwrn4458',
});

// Cấu hình lưu trữ cho Multer


export { cloudinary};