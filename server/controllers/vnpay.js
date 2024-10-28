// controllers/paymentController.js
import vnpay from '../models/vnpay.js';
import crypto from 'crypto';
import querystring from 'querystring'

export const createPayment = (req, res) => {
  const { amount, orderId } = req.body;

  // Cấu hình các tham số từ VNPay
  const tmnCode = '66XQPHNL';
  const secretKey = '13ZBEJBWEALTNT5GWGCPW0SNDWROX83R';
  const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  const returnUrl = 'http://localhost:5173/';

  const date = new Date();
  const createDate = date.toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  
  const orderInfo = `Thanh toan don hang ${orderId}`;
  
  const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  let vnpParams = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Amount: amount * 100, // Chuyển đổi sang đồng nhỏ nhất
    vnp_CreateDate: createDate,
    vnp_CurrCode: 'VND',
    vnp_IpAddr: ipAddr,
    vnp_Locale: 'vn',
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'billpayment',
    vnp_ReturnUrl: returnUrl,
    vnp_TxnRef: orderId,
    vnp_ExpireDate: createDate + '300',
  };

  // Tạo URL với các tham số đã được mã hóa
  vnpParams = sortObject(vnpParams);
  const signData = querystring.stringify(vnpParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const secureHash = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  
  vnpParams['vnp_SecureHash'] = secureHash;
  const vnpUrlWithParams = `${vnpUrl}?${querystring.stringify(vnpParams)}`;

  // Trả về URL VNPay để thực hiện thanh toán
  res.json({ code: '00', message: 'success', data: vnpUrlWithParams });
};

// Xử lý callback sau khi thanh toán thành công
export const paymentReturn = async (req, res) => {
  const vnpParams = req.query;

  const secureHash = vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = sortObject(vnpParams);
  const signData = querystring.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNPAY_SECRETKEY);
  const checksum = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  if (secureHash === checksum) {
    // Lưu thông tin giao dịch vào database
    const payment = new vnpay({
      userId: req.user._id,
      orderId: vnpParams['vnp_TxnRef'],
      amount: vnpParams['vnp_Amount'] / 100,
      vnp_TransactionStatus: vnpParams['vnp_TransactionStatus'],
      vnp_ResponseCode: vnpParams['vnp_ResponseCode'],
      vnp_TransactionNo: vnpParams['vnp_TransactionNo'],
      vnp_BankCode: vnpParams['vnp_BankCode'],
      vnp_PayDate: vnpParams['vnp_PayDate'],
    });

    await payment.save();
    res.json({ code: '00', message: 'success' });
  } else {
    res.status(400).json({ code: '97', message: 'Invalid checksum' });
  }
};

// Sắp xếp object theo thứ tự từ điển
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}

