import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Brand from "../models/brand.js";
import Product from "../models/Product.js";
import mongoose from 'mongoose';
import multer from 'multer'
import { storage } from '../utils/cloudinary.js'; 

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
    
    // Create query object
    const query = {};

    // Filter by brand
    if (brand) {
      query.brand = new mongoose.Types.ObjectId(brand);
    }

    // Filter by category
    if (category) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    // Filter by size (assuming products have a `sizes` array and you want to check for the existence of the size in that array)
    if (size) {
      query['variants.size'] = size;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query['variants.price'] = {};
      if (minPrice) {
        query['variants.price'].$gte = minPrice; // Greater than or equal to minPrice
      }
      if (maxPrice) {
        query['variants.price'].$lte = maxPrice; // Less than or equal to maxPrice
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
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};

// Middleware xử lý upload nhiều ảnh (tối đa 10 ảnh)
export const uploadImages = upload.array('images', 10); // Tối đa 10 ảnh cùng lúc

export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("category").populate("brand");
    if (!data) {
      return res.status(400).json({ message: "Lay san pham that bai!" });
    }
    return res.status(201).json({
      message: "Lay san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { variants, ...productData } = req.body; 

    if (variants) {
      const sanitizedVariants = variants.map(({ _id, ...variant }) => variant);
      productData.variants = sanitizedVariants;
    }

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