import { errorMessages, successMessages } from "../constants/message.js";
import image from "../models/image.js";
export const getImage = async (req, res, next) => {
  try {
    const data = await image.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach ảnh thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co ảnh nao!" });
  } catch (error) {
    next(error);
  }
};
export const createImage = async (req, res, next) => {
  try {
    const data = await image.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them ảnh that bai!" });
    }
    return res.status(201).json({
      message: "Them ảnh thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getImageById = async (req, res, next) => {
  try {
    const data = await image.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay ảnh that bai!" });
    }
    return res.status(201).json({
      message: "Lay ảnh thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateImageById = async (req, res, next) => {
  try {
    const data = await image.findByIdAndUpdate(
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
export const removeImageById = async (req, res, next) => {
  try {
   await image.findByIdAndDlete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

