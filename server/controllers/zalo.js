import crypto from 'crypto';
import zalo from '../models/zalo.js'
import { zaloPay } from '../utils/zalopay.js';
import axios from 'axios';

export const createPayment = async (req, res) => {
  try {
    const { amount, userId } = req.body;
    
    const orderId = `${Date.now()}`;
    const appTransId = `${Date.now()}`;
    const embedData = JSON.stringify({ redirectUrl: 'http://localhost:5173/' }); // URL chuyển hướng sau khi thanh toán thành công

    // Dữ liệu thanh toán
    const data = {
      app_id: zaloPay.app_id,
      app_trans_id: appTransId,
      app_user: 'demo',
      app_time: Date.now(),
      amount: amount,
      item: JSON.stringify([{ itemid: 'knb', itemname: 'ZaloPay', itemprice: amount, itemquantity: 1 }]),
      embed_data: embedData,
      bank_code: 'zalopayapp',
      description: `Thanh toan don hang ${orderId}`,
    };

    const dataString = `${zaloPay.app_id}|${appTransId}|${data.app_user}|${data.amount}|${data.app_time}|${data.embed_data}`;
    data.mac = crypto.createHmac('sha256', zaloPay.key1).update(dataString).digest('hex');

    // Gửi yêu cầu tạo đơn hàng đến ZaloPay
    const zalopayRes = await axios.post(zaloPay.endpoint, data);
console.log('ZaloPay response:', zalopayRes.data); // Log phản hồi từ ZaloPay

if (zalopayRes.data.return_code === 1) {
  const payment = new zalo({
    userId,
    orderId,
    amount,
    status: 'pending',
  });
  await payment.save();

  res.status(200).json({ 
    paymentUrl: zalopayRes.data.order_url 
  });
} else {
  res.status(400).json({ message: 'Failed to create payment', error: zalopayRes.data });
}

    if (zalopayRes.data.return_code === 1) {
      // Lưu thông tin thanh toán vào database
      const payment = new zalo({
        userId,
        orderId,
        amount,
        status: 'pending',
      });
      await payment.save();

      res.status(200).json({ 
        paymentUrl: zalopayRes.data.order_url 
      });
    } else {
      res.status(400).json({ message: 'Failed to create payment' });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const zalopayCallback = async (req, res) => {
  const { orderId, result } = req.body;

  try {
    // Cập nhật trạng thái thanh toán
    const payment = await zalo.findOneAndUpdate({ orderId }, { status: result === 1 ? 'success' : 'failed' });

    if (result === 1) {
      res.redirect('/'); // Chuyển hướng về trang chủ khi thanh toán thành công
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

