import { errorMessages, successMessages } from "../constants/message.js";
import cart from "../models/cart.js";
export const getCart = async (req, res, next) => {
  try {
    const data = await cart.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach trong giỏ hàng thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co đơn  nao!" });
  } catch (error) {
    next(error);
  }
};
export const createCart = async (req, res, next) => {
  try {
    const data = await cart.create(req.body);
    
    if (!data) {
      return res.status(400).json({ message: "Them đơn that bai!" });
    }
    return res.status(201).json({
      message: "Them đơn thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const data = await cart.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay đơn that bai!" });
    }
    return res.status(201).json({
      message: "Lay đơn thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartById = async (req, res, next) => {
  try {
    const data = await cart.findByIdAndUpdate(
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
export const removeCartById = async (req, res, next) => {
  try {
   await cart.findByIdAndDlete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

