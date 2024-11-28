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
    // Kiểm tra xem sản phẩm đã được thanh toán chưa
    const existingOrder = await order.findOne({ 
      product: req.body.product, 
      isPaid: true 
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Sản phẩm này đã được thanh toán!" });
    }

    // Tiến hành tạo đơn hàng mới
    const data = await order.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Đặt hàng thất bại!" });
    }

    return res.status(201).json({
      message: "Đặt hàng thành công!",
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
    const { id } = req.params;

    // Lấy thông tin đơn hàng hiện tại
    const existingOrder = await order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    if (existingOrder.isPaid) {
      return res.status(400).json({ message: "Đơn hàng này đã được thanh toán!" });
    }

    const { product, variantId, variantQuantity } = existingOrder;

    // Kiểm tra số lượng tồn kho
    const paidOrders = await order.aggregate([
      { $match: { product, variantId, isPaid: true } },
      { $group: { _id: null, totalQuantity: { $sum: "$variantQuantity" } } }
    ]);

    const totalQuantityPaid = paidOrders.length > 0 ? paidOrders[0].totalQuantity : 0;

    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }

    const variant = productData.variant.find(v => v._id.toString() === variantId);
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể của sản phẩm!" });
    }

    const availableQuantity = variant.stock - totalQuantityPaid;

    if (variantQuantity > availableQuantity) {
      return res.status(400).json({ 
        message: `Số lượng không đủ! Chỉ còn lại ${availableQuantity} sản phẩm có sẵn.` 
      });
    }

    // Cập nhật trạng thái thanh toán
    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { isPaid: true },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(400).json({ message: "Cập nhật đơn hàng thất bại!" });
    }

    return res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công!",
      data: updatedOrder,
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



