import { errorMessages, successMessages } from "../constants/message.js";
import size from "../models/size.js";
export const getSize = async (req, res, next) => {
  try {
    const data = await size.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach kích thước thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co kích thước nao!" });
  } catch (error) {
    next(error);
  }
};
export const createSize = async (req, res, next) => {
  try {
    const data = await size.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them kích thước that bai!" });
    }
    return res.status(201).json({
      message: "Them kích thước thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getSizeById = async (req, res, next) => {
  try {
    const data = await size.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay kích thước that bai!" });
    }
    return res.status(201).json({
      message: "Lay kích thước thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSizeById = async (req, res, next) => {
  try {
    const data = await size.findByIdAndUpdate(
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
export const removeSizeById = async (req, res, next) => {
  try {
   await size.findByIdAndDelete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

