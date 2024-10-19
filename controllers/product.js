import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

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
    const { image, ...rest } = req.body; // Lấy đường dẫn ảnh từ req.body
    const data = await Product.create({
      ...rest,
      image: req.file.path, // Lưu đường dẫn ảnh
    });

    const updateCategory = await Category.findByIdAndUpdate(
      data.category,
      { $push: { products: data._id } },
      { new: true }
    );

    if (!data || !updateCategory) {
      return res.status(400).json({ message: "Thêm sản phẩm thất bại!" });
    }
    return res.status(201).json({
      message: "Thêm sản phẩm thành công!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");
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
    const { image, ...rest } = req.body; // Lấy đường dẫn ảnh từ req.body
    const updateData = {
      ...rest,
    };

    if (req.file) {
      updateData.image = req.file.path; // Cập nhật đường dẫn ảnh nếu có
    }

    const data = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    const updateCategory = await Category.findByIdAndUpdate(
      data.category,
      { $push: { products: data._id } },
      { new: true }
    );

    if (!data || !updateCategory) {
      return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_SUCCESS,
      data,
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
// export const softRemoveProductById = async (req, res, next) => {
//   try {
//     const data = await Product.findByIdAndUpdate(
//       `${req.params.id}`,
//       {
//         hide: true,
//       },
//       {
//         new: true,
//       }
//     );
//     //! findByIdAndUpdate !== findByIdAndRemove
//     if (!data) {
//       return res.status(400).json({ message: "Cap nhat san pham that bai!" });
//     }
//     return res.status(201).json({
//       message: "Cap nhat san pham thanh cong!",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const DeleteVariant = async (req, res, next) => {
  try {
    const variantId = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "sản phẩm không tồn tại" });
    }
    product.variant = product.variant.filter(
      (variant) => variant._id.toString() !== variantId
    );
    await product.save();
    res.status('200').json({
      message: 'Biến thể đã bị xóa thành công',
      product
    })
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error });
  }
}

export const AddVariant = async (req, res) => {
  try {
    const { color, size, quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    // Thêm biến thể mới vào danh sách biến thể
    product.variants.push({ color, size, quantity });
    await product.save();

    res.status(201).json({
        message: 'Biến thể mới đã được thêm thành công',
        product
    });
} catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error });
}
}

