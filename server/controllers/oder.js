import { errorMessages, successMessages } from "../constants/message.js";
import order from "../models/order.js";
export const getOrder = async (req, res, next) => {
  try {
    const data = await order.find({}).populate('ship').populate('voucher');
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach order thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co order nao!" });
  } catch (error) {
    next(error);
  }
};
export const createOrder = async (req, res, next) => {
  try {
    const data = await order.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Đặt hàng that bai!" });
    }
    return res.status(201).json({
      message: "Đặt hàng thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const data = await order.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay order that bai!" });
    }
    return res.status(201).json({
      message: "Lay order thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const getOrderByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await order.find({ user: userId }).populate('ship').populate('voucher');
    
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lấy danh sách order theo User ID thành công!",
        data,
      });
    }
    return res.status(404).json({ message: "Không có order nào cho user này!" });
  } catch (error) {
    next(error);
  }
};
export const updateOrderById = async (req, res, next) => {
  try {
    const data = await order.findByIdAndUpdate(
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
export const removeOrderById = async (req, res, next) => {
  try {
   await order.findByIdAndDlete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

export const getOneOrderByUserIdAndOrderId = async (req, res, next) => {
  try {
    console.log("User ID:", req.params.userId);
    console.log("Order ID:", req.params.orderId);

    const data = await order.findOne({ _id: req.params.orderId, user: req.params.userId }).populate('ship').populate('voucher');

    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng này cho người dùng!" });
    }
    
    return res.status(200).json({
      message: "Lấy đơn hàng thành công!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

