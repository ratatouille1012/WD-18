import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Brand from "../models/brand.js";
import Product from "../models/Product.js";
import mongoose from 'mongoose';
// import multer from 'multer'
import { cloudinary, storage } from '../utils/cloudinary.js'; 
import {uploade} from "../middlewares/multer.js"; // Middleware xử lý file

export const getProductVariant = async (req,res) => {
  const { variantId } = req.params;

    try {
        const product = await Product.findOne({ 'variant._id': variantId })
            .populate('variant.color')
            .populate('variant.size');  

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
}


export const getProducts = async (req, res, next) => {
  try {
    const { brand, category, size, minPrice, maxPrice, name } = req.query;
    
    // Tạo query object
    const query = {};

    // Lọc theo brand
    if (brand) {
      query.brand = new mongoose.Types.ObjectId(brand);
    }

    // Lọc theo category
    if (category) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    // Lọc theo size (giả sử sản phẩm có mảng sizes và bạn muốn kiểm tra tồn tại size trong mảng này)
    if (size) {
      query['variants.size'] = size;
    }

    // Lọc theo khoảng giá
    if (minPrice || maxPrice) {
      query['variants.price'] = {};
      if (minPrice) {
        query['variants.price'].$gte = minPrice; // Lớn hơn hoặc bằng minPrice
      }
      if (maxPrice) {
        query['variants.price'].$lte = maxPrice; // Nhỏ hơn hoặc bằng maxPrice
      }
    }

    // Filter by name (partial match, case-insensitive)
    if (name) {
      query.title = { $regex: name, $options: "i" };
    }

    // Find products with the specified filters
    const data = await Product.find(query)
      .populate("category")
      .populate("brand");
    
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lấy danh sách sản phẩm thành công!",
        data,
      });
    }

    return res.status(404).json({ message: "Không có sản phẩm nào!" });
  } catch (error) {
    next(error);
  }
};


// Hàm tạo sản phẩm có upload nhiều ảnh

const upload = multer({ storage });

// Hàm tạo sản phẩm có upload nhiều ảnh
export const createProduct = async (req, res, next) => {
  try {
    const { error } = Product.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid body request!", errors: error.details });
    }

    const { brand, category, ...productData } = req.body;

    // Lưu URL ảnh sau khi upload lên Cloudinary
    const imageUrls = req.files.map(file => file.path); // Lấy URL của nhiều ảnh

    const newProduct = new Product({
      ...productData,
      brand: new mongoose.Types.ObjectId(brand),
      category: new mongoose.Types.ObjectId(category),
      images: imageUrls, // Lưu URLs của nhiều ảnh
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Middleware xử lý upload nhiều ảnh (tối đa 10 ảnh)
export const uploadImages = upload.array('images', 10); // Tối đa 10 ảnh cùng lúc



// Middleware xử lý upload nhiều ảnh (tối đa 10 ảnh)
  
export const getProductById = async (req, res, next) => {
  try {
    // Kiểm tra nếu id không hợp lệ
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const data = await Product.findById(id).populate("category").populate("brand");
    
    if (!data) {
      return res.status(400).json({ message: "Lấy sản phẩm thất bại!" });
    }

    return res.status(201).json({
      message: "Lấy sản phẩm thành công!",
      data,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của ID sản phẩm
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { variants, ...productData } = req.body;

    if (variants) {
      // Duyệt qua từng variant để đảm bảo không thay đổi _id
      const sanitizedVariants = variants.map(variant => {
        if (variant._id && mongoose.Types.ObjectId.isValid(variant._id)) {
          return { ...variant, _id: variant._id }; // Giữ nguyên _id nếu hợp lệ
        } else {
          const { _id, ...rest } = variant; // Bỏ _id nếu không hợp lệ
          return rest;
        }
      });

      productData.variants = sanitizedVariants;
    }

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy!" });
    }

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};




// ! Xoá cứng! Không dùng
export const removeProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).json({
        message: successMessages.DELETE_PRODUCT_SUCCESS,
        data,
      });
    }
    return res.status(400).json({ message: errorMessages.DELETE_FAIL });
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm
export const softRemoveProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    //! findByIdAndUpdate !== findByIdAndRemove
    if (!data) {
      return res.status(400).json({ message: "Cap nhat san pham that bai!" });
    }
    return res.status(201).json({
      message: "Cap nhat san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const searchProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Tạo query cho việc tìm kiếm theo tên sản phẩm, không phân biệt chữ hoa chữ thường
    const query = name ? { title: { $regex: name, $options: "i" } } : {};

    // Thực hiện tìm kiếm
    const data = await Product.find(query)
      .populate("category")
      .populate("brand");

    if (data && data.length > 0) {
      return res.status(200).json({
        message: successMessages.GET_PRODUCTS_SUCCESS,
        data,
      });
    }

    return res.status(404).json({ message: errorMessages.NO_PRODUCTS_FOUND });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: errorMessages.SERVER_ERROR });
  }
};