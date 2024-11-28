import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import zalo from '../models/zalo.js';
import { zalopayConfig  } from '../utils/zalopay.js';

// Tạo thanh toán
export const createPayment = async (req, res) => {
  const { amount, appUser } = req.body;
  const embed_data = { redirecturl: 'https://your-success-url.com' };
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: zalopayConfig.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    app_user: appUser || 'guest',
    app_time: Date.now(),
    item: JSON.stringify([]),
    embed_data: JSON.stringify(embed_data),
    amount,
    callback_url: 'https://your-ngrok-url/callback',
    description: `Payment for order #${transID}`,
  };

  const data = `${zalopayConfig.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, zalopayConfig.key1).toString();

  try {
    const result = await axios.post(`${zalopayConfig.endpoint}/create`, null, { params: order });

    // Lưu giao dịch vào DB
    await zalo.create({
      appTransId: order.app_trans_id,
      appUser: order.app_user,
      amount: order.amount,
    });

    return res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Payment creation failed' });
  }
};

// Xử lý callback
export const paymentCallback = async (req, res) => {
  const { data, mac: reqMac } = req.body;

  const mac = CryptoJS.HmacSHA256(data, zalopayConfig.key2).toString();
  if (mac !== reqMac) {
    return res.status(400).json({ return_code: -1, return_message: 'Invalid MAC' });
  }

  const zaloData = JSON.parse(data);
  const { app_trans_id } = zaloData;

  try {
    await zalo.findOneAndUpdate(
      { appTransId: app_trans_id },
      { status: 'success' }
    );
    return res.status(200).json({ return_code: 1, return_message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ return_code: 0, return_message: 'Server error' });
  }
};
export const checkStatusOrder = async (req, res) => {
  const { app_trans_id } = req.body;

  const data = `${zalopayConfig.app_id}|${app_trans_id}|${zalopayConfig.key1}`;
  const mac = CryptoJS.HmacSHA256(data, zalopayConfig.key1).toString();

  const postData = {
    app_id: zalopayConfig.app_id,
    app_trans_id,
    mac,
  };

  try {
    const result = await axios.post(`${zalopayConfig.endpoint}/query`, null, { params: postData });
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to check order status' });
  }
};
