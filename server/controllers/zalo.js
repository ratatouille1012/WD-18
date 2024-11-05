// controllers/paymentController.js
import axios from 'axios';
import { zaloPayConfig } from '../utils/zalopay.js';
import zalo from '../models/zalo.js';

// Hàm tạo thanh toán
export const createPayment = async (req, res) => {
  const { amount, orderId } = req.body;

  try {
    const data = {
      appid: zaloPayConfig.app_id,
      amount,
      order_id: orderId,
      description: 'Payment for order',
      callback_url: 'http://your-callback-url.com', // Đặt URL callback của bạn ở đây
    };

    const response = await axios.post(zaloPayConfig.endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const payment = new zalo({ amount, orderId, status: 'pending' });
    await payment.save();

    res.status(200).json({ paymentUrl: response.data.order_url });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};

// Hàm xử lý callback từ ZaloPay
export const handleCallback = async (req, res) => {
  const { orderId, status } = req.body; // ZaloPay sẽ gửi thông tin orderId và status về đây

  try {
    const payment = await zalo.findOne({ orderId });

    if (payment) {
      payment.status = status; // Cập nhật trạng thái thanh toán
      await payment.save();
      res.status(200).json({ message: 'Payment status updated successfully.' });
    } else {
      res.status(404).json({ message: 'Payment not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status', error });
  }
};

// Hàm kiểm tra trạng thái thanh toán
export const checkStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const payment = await zalo.findOne({ orderId });

    if (payment) {
      res.status(200).json({ status: payment.status });
    } else {
      res.status(404).json({ message: 'Payment not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment status', error });
  }
};
