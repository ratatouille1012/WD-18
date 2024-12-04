import orderHis from '../models/orderHis.js';
import OrderHistory from '../models/orderHis.js';

// Create a new order history entry
export const createOrderHistory = async (req, res) => {
    try {
        const { order, status, description, user, time } = req.body;

        const newOrderHistory = new OrderHistory({
            order,
            status,
            description,
            user,
            time
        });

        await newOrderHistory.save();
        return res.status(201).json(newOrderHistory);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create order history', error });
    }
};

// Get all order history entries
export const getAllOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.find().populate('order user');
        return res.status(200).json(orderHistory);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch order history', error });
    }
};

// Get order history by ID
export const getOrderHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderHistory = await OrderHistory.findById(id).populate('order user');
        if (!orderHistory) {
            return res.status(404).json({ message: 'Order history not found' });
        }
        return res.status(200).json(orderHistory);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch order history by ID', error });
    }
};

// Update an order history entry
export const updateOrderHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, description, user, time } = req.body;

        const updatedOrderHistory = await OrderHistory.findByIdAndUpdate(
            id,
            { status, description, user, time },
            { new: true }
        );

        if (!updatedOrderHistory) {
            return res.status(404).json({ message: 'Order history not found' });
        }
        return res.status(200).json(updatedOrderHistory);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update order history', error });
    }
};

// Delete an order history entry
export const deleteOrderHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrderHistory = await OrderHistory.findByIdAndDelete(id);

        if (!deletedOrderHistory) {
            return res.status(404).json({ message: 'Order history not found' });
        }

        return res.status(200).json({ message: 'Order history deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete order history', error });
    }
};

// Fetch order history by order and user IDs using req.body
export const getOrderHistoryByOrderAndUser = async (req, res,next) => {
    try {
        const { orderId } = req.params;
        const data = await orderHis.find({ order: orderId }).populate('order');
        
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

