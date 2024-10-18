import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dhl9offsc",
    api_key: "814536668681882",
    api_proxy : "111111111",
    api_secret: 'AbldWIhl8rAnm3TJnl5wwrn4458'
});
console.log('Cloudinary config:', JSON.stringify({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }, null, 2));

export default cloudinary

