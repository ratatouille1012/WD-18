import variant from "../models/variant.js"
import { errorMessages, successMessages } from "../constants/message.js";
import Product from "../models/Product.js";

export const getVariant = async (req, res, next) => {
    try {
        const data = await variant.find({}).populate('color').populate('size');
        if (data && data.length > 0) {
            return res.status(200).json({
              message: "Lay danh sach biến thể thanh cong!",
              data,
            });
          }
          return res.status(404).json({ message: "Khong co biến thể nao!" });
    } catch (error) {
        next(error);
    }
};

export const createVariant = async (req, res, next) => {
    try {
        const data = await variant.create(req.body);
        if (!data) {
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

export const updateVariant = async (req, res, next) => {
    try {
        const data = await variant.findByIdAndUpdate(req.params.id, req.body,{new : true});
        if (!data) {
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
export const getVariantById = async (req, res, next) => {
  try {
      const product = await Product.findOne({ "variant._id": req.params.id })
          .populate('variant.color')
          .populate('variant.size');

      if (!product) {
          return res.status(404).json({ message: "Biến thể không tìm thấy!" });
      }

      // Find the specific variant by ID
      const variant = product.variant.id(req.params.id);
      if (!variant) {
          return res.status(404).json({ message: "Biến thể không tìm thấy!" });
      }

      return res.status(200).json({
          message: successMessages.UPDATE_SUCCESS,
          data: variant,
      });
  } catch (error) {
      next(error);
  }
};



export const removeVariant = async (req, res, next) => {
    try {
        const data = await variant.findByIdAndDelete(req.params.id);
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
}
