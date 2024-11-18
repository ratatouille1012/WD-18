import { errorMessages, successMessages } from "../constants/message.js";
import User from "../models/User.js";
export const getUser = async (req, res, next) => {
  try {
    const data = await User.find({});
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
export const createUser = async (req, res, next) => {
  try {
    const data = await User.create(req.body);
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

export const getUserById = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
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

export const updateUserById = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(
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
export const removeUserById = async (req, res, next) => {
  try {
   await User.findByIdAndDelete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

