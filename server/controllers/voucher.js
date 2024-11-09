import { errorMessages, successMessages } from "../constants/message.js";
import voucher from "../models/voucher.js";
export const getVoucher = async (req, res, next) => {
  try {
    const data = await voucher.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach mã giảm giá thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong mã giảm giá nao!" });
  } catch (error) {
    next(error);
  }
};
export const createVoucher = async (req, res, next) => {
  try {
    const { code } = req.body;

    const existingVoucher = await voucher.findOne({ code });
    if (existingVoucher) {
        return res.status(400).json({ message: "Đã tồn tại mã này" });
    }
    const data = await voucher.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them mã giảm giá that bai!" });
    }
    return res.status(201).json({
      message: "Them mã giảm giá thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getVoucherById = async (req, res, next) => {
  try {
    const data = await voucher.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay mã giảm giá that bai!" });
    }
    return res.status(201).json({
      message: "Lay mã giảm giá thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVoucherById = async (req, res, next) => {
  try {
    const data = await voucher.findByIdAndUpdate(
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
export const removeVoucherById = async (req, res, next) => {
  try {
   await voucher.findByIdAndDelete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

