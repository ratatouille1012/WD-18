import Vnpay from '../models/Payment.js';
import { generateVnpayUrl } from '../utils/vnpayHelper.js';
import crypto from 'crypto';
import querystring from 'querystring';

export const createPayment = async (req, res) => {
    try {
        const { amount, orderId, bankCode } = req.body;
        console.log('Received data:', { amount, orderId, bankCode });

        const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('IP Address:', ipAddr);

        const paymentUrl = generateVnpayUrl({
            tmnCode: process.env.VNP_TMNCODE,
            hashSecret: process.env.VNP_HASHSECRET,
            returnUrl: process.env.VNP_RETURNURL,
            amount,
            orderId,
            ipAddr,
            bankCode,
        });
        console.log('Generated VNPAY URL:', paymentUrl);

        res.status(200).json({ status: 'success', paymentUrl });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};


export const handleReturn = async (req, res) => {
    try {
        const vnpParams = req.query; // Tham số từ VNPAY gửi về
        console.log('VNPAY callback params:', vnpParams);

        const secureHash = vnpParams.vnp_SecureHash; // Chữ ký nhận được
        console.log('SecureHash received:', secureHash);

        // Xóa các tham số không cần thiết trước khi tạo checksum
        delete vnpParams.vnp_SecureHash;
        delete vnpParams.vnp_SecureHashType;

        // Sắp xếp tham số và tạo chuỗi ký
        const sortedParams = querystring.stringify(sortObject(vnpParams), { encode: false });
        console.log('Sorted params for checksum:', sortedParams);

        // Tính toán checksum
        const hashSecret = process.env.VNP_HASHSECRET;
        const hmac = crypto.createHmac('sha512', hashSecret);
        const checkSum = hmac.update(Buffer.from(sortedParams, 'utf-8')).digest('hex');
        console.log('Generated checksum:', checkSum);

        if (secureHash === checkSum) {
            console.log('Checksum is valid.');
            // Xử lý kết quả thanh toán
            const status = vnpParams.vnp_ResponseCode === '00' ? 'success' : 'failed';
            res.status(200).json({ status, message: 'Payment processed successfully' });
        } else {
            console.error('Invalid checksum!');
            res.status(400).json({ status: 'error', message: 'Invalid checksum' });
        }
    } catch (error) {
        console.error('Error handling return:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};                      

