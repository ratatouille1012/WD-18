import contact from "../models/contact.js";

export const createContact = async (req, res, next) => {
    try {
      const data = await contact.create(req.body);
      if (!data) {
        return res.status(400).json({ message: "Them liên lạc that bai!" });
      }
      return res.status(201).json({
        message: "Them liên lạc thanh cong!",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  export const getContact = async (req, res, next) => {
    try {
      const data = await contact.find({});
      if (data && data.length > 0) {
        return res.status(200).json({
          message: "Lay danh sach liên hệ thanh cong!",
          data,
        });
      }
      return res.status(404).json({ message: "Khong co liên hệ nao!" });
    } catch (error) {
      next(error);
    }
  };