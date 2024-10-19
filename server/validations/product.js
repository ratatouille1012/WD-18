import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().optional().min(3).max(255), // Đánh dấu là optional
  price: Joi.number().optional().min(0), // Đánh dấu là optional
  description: Joi.string().min(3).optional(), // Đánh dấu là optional
  img_des:Joi.string(),
  hide: Joi.boolean().optional(),
  discountPercentage: Joi.number().min(0).max(100).optional(),
  rating: Joi.number().min(0).max(5).optional(),
  stock: Joi.number().min(0).optional(),
  brand: Joi.string().optional(), // Đánh dấu là optional
  category: Joi.string().optional(), // Đánh dấu là optional
  thumbnail: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  variant: Joi.array().items(
    Joi.object({
      color: Joi.string().required(), // Vẫn giữ required nếu bạn cần
      size: Joi.string().required(),  // Vẫn giữ required nếu bạn cần
      quantity: Joi.number().min(0).required(), // Required nếu cần
      importPrice: Joi.number().min(0).required(), // Required nếu cần
      listPrice: Joi.number().min(0).required(), // Required nếu cần
      salePrice: Joi.number().min(0).required() // Required nếu cần
    })
  ).optional(),
});

export default productSchema;
