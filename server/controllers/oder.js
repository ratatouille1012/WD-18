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
    // Kiểm tra nếu trạng thái đã là "đã thanh toán", thì không cập nhật lại
    const existingOrder = await order.findById(req.params.id);

    if (existingOrder.isPaid) {
      return res.status(400).json({ message: "Đơn hàng này đã được thanh toán!" });
    }

    // Cập nhật trạng thái thanh toán thành công
    const data = await order.findByIdAndUpdate(
      req.params.id,
      { isPaid: true },
      { new: true }
    );

    if (!data) {
      return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
    }

    return res.status(200).json({
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

export const checkoutOrder = async (req, res, next) => {
  try {
    // Kiểm tra xem sản phẩm đã thanh toán hay chưa
    const existingOrder = await order.findOne({ 
      product: req.body.product, 
      isPaid: true 
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Sản phẩm này đã được thanh toán!" });
    }

    // Tiến hành thanh toán và cập nhật trạng thái đơn hàng
    const orderToUpdate = await order.findByIdAndUpdate(
      req.params.id,
      { isPaid: true },
      { new: true }
    );

    if (!orderToUpdate) {
      return res.status(400).json({ message: "Thanh toán thất bại!" });
    }

    // Trừ số lượng của biến thể
    const productId = orderToUpdate.product; // Lấy ID sản phẩm từ đơn hàng
    const variantId = orderToUpdate.variant; // Lấy ID biến thể từ đơn hàng
    const variantQuantity = orderToUpdate.quantity; // Lấy số lượng từ đơn hàng

    // Tìm sản phẩm và cập nhật số lượng biến thể
    const product = await Product.findById(productId); // Lấy thông tin sản phẩm
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }

    const variant = product.variants.id(variantId); // Tìm biến thể theo ID
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể!" });
    }

    // Trừ số lượng của biến thể
    if (variant.stock >= variantQuantity) {
      variant.stock -= variantQuantity;
      await product.save();
    } else {
      return res.status(400).json({ message: "Số lượng trong kho không đủ!" });
    }

    return res.status(200).json({
      message: "Thanh toán thành công và số lượng sản phẩm đã được cập nhật!",
      data: orderToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

