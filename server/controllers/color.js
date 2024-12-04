import { errorMessages, successMessages } from "../constants/message.js";
import color from "../models/color.js";
export const getColor = async (req, res, next) => {
  try {
    const data = await color.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach màu sắc thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co màu sắc nao!" });
  } catch (error) {
    next(error);
  }
};
export const createColor = async (req, res, next) => {
  try {
    const data = await color.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them màu sắc that bai!" });
    }
    return res.status(201).json({
      message: "Them màu sắc thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getColorById = async (req, res, next) => {
  try {
    const data = await color.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay màu sắc that bai!" });
    }
    return res.status(201).json({
      message: "Lay màu sắc thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateColorById = async (req, res, next) => {
  try {
    const data = await color.findByIdAndUpdate(
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
export const removeColorById = async (req, res, next) => {
  try {
   await color.findByIdAndDelete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

