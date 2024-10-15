import { errorMessages, successMessages } from "../constants/message.js";
import orderItem from "../models/orderItem.js";
export const getOrderItem = async (req, res, next) => {
  try {
    const data = await orderItem.find({}).populate('order').populate('variant');
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach order Item thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co order Item nao!" });
  } catch (error) {
    next(error);
  }
};
export const createOrderItem = async (req, res, next) => {
  try {
    const data = await orderItem.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them order Item that bai!" });
    }
    return res.status(201).json({
      message: "Them order Item thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderItemById = async (req, res, next) => {
  try {
    const data = await orderItem.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay order Item that bai!" });
    }
    return res.status(201).json({
      message: "Lay order Item thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderItemById = async (req, res, next) => {
  try {
    const data = await orderItem.findByIdAndUpdate(
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
export const removeOrderItemById = async (req, res, next) => {
  try {
   await orderItem.findByIdAndDlete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

