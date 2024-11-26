import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Brand from "../models/brand.js";
import Product from "../models/Product.js";
import mongoose from 'mongoose';
// import multer from 'multer'
import { storage } from '../utils/cloudinary.js'; 
import { bucket } from "../utils/firebaseConfig.js"; // Firebase config
import multer from "../middlewares/multer.js"; // Middleware xử lý file

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
    const { brand, category, size, minPrice, maxPrice, title } = req.query;
    
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

    // Filter by title (partial match, case-insensitive)
    if (title) {
      query.title = { $regex: title, $options: "i" };
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
export const createProduct = async (req, res, next) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { error } = Product.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid body request!", errors: error.details });
    }

    const { brand, category, ...productData } = req.body;

    // Kiểm tra có file upload không
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded!" });
    }

    // Upload từng ảnh lên Firebase Storage
    const imageUrls = [];
    for (const file of req.files) {
      const fileName = `${Date.now()}_${file.originaltitle}`;
      const blob = bucket.file(fileName);

      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.end(file.buffer);

      await new Promise((resolve, reject) => {
        blobStream.on("finish", async () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          imageUrls.push(publicUrl); // Thêm URL ảnh vào mảng
          resolve();
        });

        blobStream.on("error", reject);
      });
    }

    // Tạo sản phẩm mới
    const newProduct = new Product({
      ...productData,
      brand: new mongoose.Types.ObjectId(brand),
      category: new mongoose.Types.ObjectId(category),
      images: imageUrls, // Lưu URL ảnh từ Firebase
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully!",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    next(error);
  }
};

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
    const { title } = req.query;

    // Kiểm tra nếu không có `title`
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Tên sản phẩm không hợp lệ! Vui lòng nhập tên sản phẩm." });
    }

    // Loại bỏ khoảng trắng thừa và tạo query tìm kiếm không phân biệt chữ hoa/thường
    const searchTitle = title.trim();
    const query = { title: { $regex: searchTitle, $options: "i" } };

    // Tìm kiếm sản phẩm
    const data = await Product.find(query)
      .populate("category", "name") // Chỉ lấy trường `name` từ category
      .populate("brand", "name"); // Chỉ lấy trường `name` từ brand

    if (data.length === 0) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm nào với tên "${searchTitle}"!` });
    }

    return res.status(200).json({
      message: `Tìm thấy ${data.length} sản phẩm phù hợp!`,
      data,
    });
  } catch (error) {
    console.error("Error searching products by name:", error.message);
    res.status(500).json({ message: "Đã xảy ra lỗi máy chủ khi tìm kiếm sản phẩm!" });
  }
};


