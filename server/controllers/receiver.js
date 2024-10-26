import { errorMessages, successMessages } from "../constants/message.js";
import receiver from "../models/receiver.js";
export const getReceiver = async (req, res, next) => {
  try {
    const data = await receiver.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh thong tin nhan hang!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co thong tin nhan hang nao!" });

  } catch (error) {
    next(error);
  }
};
export const createReceiver = async (req, res, next) => {
  try {
    const data = await receiver.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them thong tin nhan hang that bai!" });
    }
    return res.status(201).json({
      message: "Them thong tin nhan hang thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getReceiverById = async (req, res, next) => {
  try {
    const data = await receiver.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay thong tin nhan hang that bai!" });
    }
    return res.status(201).json({
      message: "Lay thong tin nhan hang thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReceiverById = async (req, res, next) => {
  try {
    const data = await receiver.findByIdAndUpdate(
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
export const removeReceiverById = async (req, res, next) => {
  try {
   await receiver.findByIdAndDelete(req.params.id);
   res.json('success')
  } catch (error) {
    next(error);
  }
};

