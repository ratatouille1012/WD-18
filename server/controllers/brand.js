import { errorMessages, successMessages } from "../constants/message.js";
import brand from "../models/brand.js";
export const getBrand = async (req, res, next) => {
  try {
    const data = await brand.find({});
    if (data && data.length > 0) {  
      return res.status(200).json({
        message: "Lay danh sach thương hiệu thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co thương hiệu nao!" });
  } catch (error) {
    next(error);
  }
};
export const createBrand = async (req, res, next) => {
  try {
    const data = await brand.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them thương hiệu that bai!" });
    }
    return res.status(201).json({
      message: "Them thương hiệu thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getBrandById = async (req, res, next) => {
  try {
    const data = await brand.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay thương hiệu that bai!" });
    }
    return res.status(201).json({
      message: "Lay thương hiệu thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBrandById = async (req, res, next) => {
  try {
    const data = await brand.findByIdAndUpdate(
      `${req.params.id}`,
      req.body,
      {
        new: true,
      }
    );
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

// ! Xoá cứng! Không dùng
export const removeBrandById = async (req, res, next) => {
  try {
   await brand.findByIdAndDelete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

