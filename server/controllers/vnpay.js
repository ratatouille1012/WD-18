import axios from 'axios';
import crypto from 'crypto';
import Vnpay from '../models/vnpay.js';
import { console } from 'inspector';

const VNPAY_TmnCode = '66XQPHNL'; // Mã đơn vị của bạn
const VNPAY_HashSecret = '13ZBEJBWEALTNT5GWGCPW0SNDWROX83R'; // Chữ ký bảo mật
const VNPAY_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

export const createPayment = async (req, res) => {
    try {
      const { orderId, amount } = req.body;
  
      if (!orderId || !amount) {
        return res.status(400).json({ message: 'Thiếu thông tin orderId hoặc amount' });
      }
  
      // Tạo dữ liệu để gửi đi
      const vnp_Params = {
        vnp_Version: '2',
        vnp_TmnCode: VNPAY_TmnCode,
        vnp_TransactionType: '00',
        vnp_OrderInfo: `Thanh toán cho đơn hàng ${orderId}`,
        vnp_OrderType: 'billpayment',
        vnp_Amount: amount * 100, // VNPAY yêu cầu gửi số tiền với đơn vị là đồng
        vnp_ReturnUrl: 'http://localhost:5173',
        vnp_TxnRef: orderId,
        vnp_CreateDate: new Date().toISOString().replace(/[-:.]/g, ''),
        vnp_Locale: 'vn',
        vnp_IpAddr: req.ip,
      };
  
      // Tạo chữ ký bảo mật
      const querystring = Object.keys(vnp_Params)
        .sort()
        .map((key) => `${key}=${vnp_Params[key]}`)
        .join('&');
      const signData = VNPAY_HashSecret + querystring;
      const secureHash = crypto
        .createHash('sha256')
        .update(signData)
        .digest('hex');
      
      vnp_Params['vnp_SecureHash'] = secureHash;
  
      const vnpUrl = `${VNPAY_Url}?${new URLSearchParams(vnp_Params).toString()}`;
  
      // Lưu thông tin đơn hàng vào database
      const order = new Vnpay({ orderId, amount });
      await order.save();
      return console.log({ paymentUrl: vnpUrl});
      // Trả về link thanh toán cho client
      return res.status(200).json({ paymentUrl: vnpUrl }); // Trả về URL cho client
      
    } catch (error) {
      console.error('Lỗi trong createPayment:', error);
      res.status(500).json({ message: 'Lỗi khi tạo thanh toán', error: error.message });
    }
  };

// Xử lý kết quả trả về từ VNPAY
export const paymentReturn = async (req, res) => {
  const { vnp_TxnRef, vnp_Amount, vnp_SecureHash } = req.query;

  try {
    // Kiểm tra chữ ký bảo mật
    const querystring = Object.keys(req.query)
      .filter((key) => key !== 'vnp_SecureHash')
      .sort()
      .map((key) => `${key}=${req.query[key]}`)
      .join('&');
    const signData = VNPAY_HashSecret + querystring;
    const secureHash = crypto
      .createHash('sha256')
      .update(signData)
      .digest('hex');

    if (secureHash === vnp_SecureHash) {
      // Xử lý thanh toán thành công
      const order = await Vnpay.findOne({ orderId: vnp_TxnRef });
      if (order) {
        order.status = 'Paid';
        await order.save();
      }

      res.redirect('/success');
    } else {
      // Xử lý khi chữ ký không hợp lệ
      res.redirect('/fail');
    }
  } catch (error) {
    console.error('Lỗi trong paymentReturn:', error);
    res.status(500).json({ message: 'Lỗi khi xử lý kết quả thanh toán', error: error.message });
  }
};
