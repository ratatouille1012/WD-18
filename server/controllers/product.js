import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Brand from "../models/brand.js";
import Product from "../models/Product.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res, next) => {
  try {
    const data = await Product.find().populate("category").populate('brand');
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co san pham nao!" });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const { error } = Product.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid body request!", errors: error.details });
    }

    const { brand, category, ...productData } = req.body;

    const newProduct = new Product({
      ...productData,
      brand: new mongoose.Types.ObjectId(brand), 
      category: new mongoose.Types.ObjectId(category), 
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

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

    const { variants, ...productData } = req.body; // Tách biệt productData và variants

    // Nếu không muốn cập nhật variants, xóa trường _id
    if (variants) {
      const sanitizedVariants = variants.map(({ _id, ...variant }) => variant); // Bỏ qua _id
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
export const searchProducts = async (req, res, next) => {
  try {
    const { brand, category, size, color, price_gte, price_lte, keyword } = req.query; // Thêm keyword vào destructuring

    let filters = {};

    // Kiểm tra nếu brand là ObjectId hợp lệ
    if (brand && mongoose.Types.ObjectId.isValid(brand)) {
      filters.brand = mongoose.Types.ObjectId(brand);
    } else if (brand) {
      return res.status(400).json({ message: "ID thương hiệu không hợp lệ!" });
    }

    // Kiểm tra nếu category là ObjectId hợp lệ
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filters.category = mongoose.Types.ObjectId(category);
    } else if (category) {
      return res.status(400).json({ message: "ID danh mục không hợp lệ!" });
    }

    if (size) filters.size = size; // Kích thước
    if (color) filters.color = color; // Màu sắc

    // Lọc theo khoảng giá
    if (price_gte || price_lte) {
      filters.price = {};
      if (price_gte) filters.price.$gte = parseFloat(price_gte);
      if (price_lte) filters.price.$lte = parseFloat(price_lte);
    }

    // Tìm kiếm theo từ khóa
    if (keyword) { // Kiểm tra nếu có từ khóa tìm kiếm
      filters.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }

    // Tìm kiếm sản phẩm với các bộ lọc
    const data = await Product.find(filters)
      .populate('brand')
      .populate('category')
      .lean(); // Sử dụng lean() để tiết kiệm bộ nhớ

    // Kiểm tra nếu có dữ liệu
    if (data && data.length > 0) {
      return res.status(200).json({
        message: successMessages.GET_PRODUCTS_SUCCESS, // Thông báo thành công
        data,
      });
    }
    return res.status(200).json({ message: "Không có sản phẩm nào khớp với yêu cầu tìm kiếm." }); // Thông báo không có sản phẩm nào
  } catch (error) {
    next(error); // Xử lý lỗi
  }
};

