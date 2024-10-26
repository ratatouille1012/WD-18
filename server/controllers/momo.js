import axios from 'axios';
import crypto from 'crypto';
import payment from '../models/momo.js';

export const createMomoPayment = async (req, res) => {
    const { amount, orderInfo } = req.body;
    
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:5173/';
    var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var requestType = "payWithMethod";
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';

    // Tạo rawSignature
    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    
    // Tạo request body
    const requestBody = {
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: 'vi',
        requestType: requestType,
        autoCapture: true,
        extraData: extraData,
        signature: signature
    };

    try {
        // Gửi yêu cầu tới MoMo
        const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
        
        // Lưu thông tin giao dịch vào MongoDB
        const newPayment = new payment({
            orderId: orderId,
            amount: amount,
            status: response.data.resultCode === 0 ? 'success' : 'failed',
            resultCode: response.data.resultCode,
            message: response.data.message
        });
        await newPayment.save();

        // Trả kết quả về cho client
        if (response.data.resultCode === 0) {
            return res.redirect(redirectUrl); // Chuyển hướng về trang chủ sau khi thanh toán thành công
        } else {
            res.status(400).json({ message: 'Thanh toán thất bại', resultCode: response.data.resultCode });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

