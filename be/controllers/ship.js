import { errorMessages, successMessages } from "../constants/message.js";
import ship from "../models/ship.js";
export const getShip = async (req, res, next) => {
  try {
    const data = await ship.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach phương thức vận chuyển thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co phương thức vận chuyển nao!" });
  } catch (error) {
    next(error);
  }
};
export const createShip = async (req, res, next) => {
  try {
    const data = await ship.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them phương thức vận chuyển that bai!" });
    }
    return res.status(201).json({
      message: "Them phương thức vận chuyển thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getShipById = async (req, res, next) => {
  try {
    const data = await ship.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay phương thức vận chuyển that bai!" });
    }
    return res.status(201).json({
      message: "Lay phương thức vận chuyển thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateShipById = async (req, res, next) => {
  try {
    const data = await ship.findByIdAndUpdate(
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
export const removeShipById = async (req, res, next) => {
  try {
   await ship.findByIdAndDlete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

