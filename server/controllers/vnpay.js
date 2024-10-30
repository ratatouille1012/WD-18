import axios from 'axios';
import vnpay from '../models/vnpay.js';
import crypto from 'crypto'
import querystring from 'querystring'
import moment from 'moment';
export const createPayment = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Tạo bản ghi vnpay trong MongoDB
    const vnpayment = new vnpay({ userId, amount });
    await vnpayment.save();

    // Cấu hình thông tin VNPay
    const vnp_TmnCode = "66XQPHNL";
    const vnp_HashSecret = "13ZBEJBWEALTNT5GWGCPW0SNDWROX83R";
    const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = "http://localhost:5173/";

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnp_TmnCode,
      vnp_Amount: amount * 100, // VNPay tính theo đơn vị VND nhỏ nhất
      vnp_Currency: 'VND',
      vnp_TxnRef: vnpay._id,
      vnp_OrderInfo: 'Thanh toan don hang',
      vnp_OrderType: 'billpayment',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: req.ip,
      vnp_CreateDate:  moment().format('YYYYMMDDHHmmss'),
    };

    // Tạo URL chứa thông tin giao dịch
    const sortedParams = Object.keys(vnp_Params).sort().reduce((result, key) => {
      result[key] = vnp_Params[key];
      return result;
    }, {});

    
    const signData = querystring.stringify(sortedParams) + `&${vnp_HashSecret}`;

    const secureHash = crypto.createHmac('sha512', vnp_HashSecret).update(signData).digest('hex');
    vnp_Params['vnp_SecureHash'] = secureHash;

    const paymentUrl = `${vnp_Url}?${querystring.stringify(vnp_Params)}`;
    res.json({ paymentUrl });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

export const handleReturnUrl = async (req, res) => {
  const { vnp_Amount, vnp_TxnRef, vnp_ResponseCode, vnp_SecureHash } = req.query;
  
  // Xác minh chữ ký bảo mật
  const vnp_HashSecret = process.env.VNP_HASH_SECRET;
  let vnp_Params = req.query;
  delete vnp_Params['vnp_SecureHash'];

  const querystring = require('querystring');
  const signData = querystring.stringify(vnp_Params) + `&${vnp_HashSecret}`;
  const secureHash = crypto.createHmac('sha512', vnp_HashSecret).update(signData).digest('hex');

  if (secureHash === vnp_SecureHash) {
    if (vnp_ResponseCode === '00') {
      // Thanh toán thành công
      await vnpay.findByIdAndUpdate(vnp_TxnRef, { paymentStatus: 'completed' });
      res.json({ message: 'Payment successful' });
    } else {
      // Thanh toán thất bại
      await vnpay.findByIdAndUpdate(vnp_TxnRef, { paymentStatus: 'failed' });
      res.json({ message: 'Payment failed' });
    }
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
};
