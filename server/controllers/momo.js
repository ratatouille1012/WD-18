import momo from '../models/momo.js';
import axios from 'axios';
import crypto from 'crypto'
// Hàm tạo thanh toán
export const createPayment = async (req, res) => {
    const { orderId, amount } = req.body;

    // Thông tin cần thiết để tạo yêu cầu thanh toán
    const partnerCode = "MOMOT5BZ20231213_TEST";
    const requestType = "captureWallet";
    const ipnUrl = "https://example.com/momo_ip"; // URL để MoMo gọi lại
    const redirectUrl = "https://momo.vn/"; // URL điều hướng sau khi thanh toán
    const requestId = `Request_ID_${Date.now()}`; // ID yêu cầu duy nhất
    const orderInfo = "Thank you for your purchase at MoMo_test";
    const extraData = "eyJza3VzIjoiIn0="; // Dữ liệu bổ sung (có thể để trống nếu không cần)
    
    // Tạo dữ liệu yêu cầu
    const rawData = `partnerCode=${partnerCode}&requestId=${requestId}&requestType=${requestType}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&redirectUrl=${redirectUrl}&ipnUrl=${ipnUrl}&extraData=${extraData}`;
    
    // Tính toán chữ ký
    const secretKey = "your_secret_key"; // Thay bằng secret key của bạn
    const signature = crypto.createHmac('sha256', secretKey).update(rawData).digest('hex');
  
    const data = {
      partnerCode,
      requestType,
      ipnUrl,
      redirectUrl,
      orderId,
      amount,
      orderInfo,
      requestId,
      extraData,
      signature,
      lang: "en",
    };
  
    try {
      // Gửi yêu cầu tới MoMo
      const response = await axios.post('https://test-payment.momo.vn/gw_payment/transactionProcessor', data);
  
      // Lưu thông tin thanh toán vào MongoDB
      const payment = new momo({
        orderId,
        amount,
        status: response.data.status || 'pending', // Trạng thái mặc định
      });
  
      await payment.save();
  
      // Trả về thông tin giao dịch
      res.status(200).json({
        message: 'Payment created successfully',
        payment: {
          orderId: payment.orderId,
          amount: payment.amount,
          status: payment.status,
        },
        momoResponse: response.data, // Thông tin phản hồi từ MoMo
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Payment failed', 
        error: error.message 
      });
    }
  };

  export const handleReturnUrl = async (req, res) => {
    const { orderId, resultCode, message, signature } = req.query; // Nhận thông tin từ query params
  
    // Kiểm tra chữ ký để xác minh tính hợp lệ của yêu cầu
    const secretKey = process.env.MOMO_SECRET_KEY; // Lấy secret key từ biến môi trường
    const rawData = `orderId=${orderId}&resultCode=${resultCode}&message=${message}`;
    const expectedSignature = crypto.createHmac('sha256', secretKey).update(rawData).digest('hex');
  
    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }
  
    try {
      // Tìm thanh toán trong cơ sở dữ liệu
      const payment = await momo.findOne({ orderId });
  
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      // Cập nhật trạng thái thanh toán
      payment.status = resultCode === '0' ? 'success' : 'failed'; // Cập nhật trạng thái dựa trên resultCode
      await payment.save();
  
      // Trả về phản hồi cho người dùng
      res.status(200).json({
        message: 'Payment processed successfully',
        payment: {
          orderId: payment.orderId,
          status: payment.status,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
  };


