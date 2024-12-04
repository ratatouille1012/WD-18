// controllers/paymentController.js
import Payment from '../models/payment.js'
import { createVnpayUrl, verifyVnpayResponse } from '../utils/vnpayHelper.js';
// Tạo mã thanh toán và lưu vào MongoDB
export const createPayment = async (req, res) => {
    const { amount, orderInfo } = req.body;

    try {
        // Tạo giao dịch mới
        const payment = new Payment({
            transactionId: Date.now().toString(),
            amount: amount,
            orderInfo: orderInfo
        });

        // Lưu giao dịch vào MongoDB
        await payment.save();

        // Gọi helper để tạo URL thanh toán
        const paymentUrl = createVnpayUrl(payment);
        res.redirect(paymentUrl);
    } catch (error) {
        console.error('Lỗi khi tạo giao dịch:', error);  // Thêm dòng này để log lỗi
        res.status(500).json({ error: 'Không thể tạo giao dịch' });
    }
};


// Xử lý kết quả thanh toán từ VNPAY và cập nhật trạng thái giao dịch
export const handleVnpayReturn = async (req, res) => {
    const vnp_Params = req.query;

    // Kiểm tra chữ ký bảo mật và xử lý kết quả
    const isValid = verifyVnpayResponse(vnp_Params);

    if (isValid) {
        try {
            // Tìm giao dịch theo transactionId
            const payment = await Payment.findOne({ transactionId: vnp_Params['vnp_TxnRef'] });

            if (!payment) {
                return res.status(404).json({ error: 'Không tìm thấy giao dịch' });
            }

            // Kiểm tra mã phản hồi của VNPAY
            if (vnp_Params['vnp_ResponseCode'] === '00') {
                payment.status = 'success';
                res.send('Thanh toán thành công!');
            } else {
                payment.status = 'failed';
                res.send('Thanh toán thất bại!');
            }

            // Cập nhật trạng thái giao dịch trong MongoDB
            await payment.save();
        } catch (error) {
            res.status(500).json({ error: 'Không thể xử lý giao dịch' });
        }
    } else {
        res.status(400).json({ error: 'Chữ ký không hợp lệ!' });
    }
};
