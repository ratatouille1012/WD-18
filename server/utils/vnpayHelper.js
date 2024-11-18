import crypto from 'crypto';
import querystring from 'querystring';

export const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort(); // Sắp xếp theo bảng chữ cái
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
};


export const generateVnpayUrl = ({ tmnCode, hashSecret, returnUrl, amount, orderId, ipAddr, bankCode }) => {
    let vnpParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Payment for order #${orderId}`,
        vnp_OrderType: 'billpayment',
        vnp_Amount: amount * 100, // Đổi sang đơn vị VND
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: new Date().toISOString().slice(0, 19).replace(/[-T:]/g, ''),
    };

    if (bankCode) {
        vnpParams.vnp_BankCode = bankCode;
    }

    // Sắp xếp tham số theo thứ tự bảng chữ cái
    vnpParams = sortObject(vnpParams);

    // Tạo chuỗi query
    const signData = querystring.stringify(vnpParams, { encode: false });

    // Tạo chữ ký SHA512
    const hmac = crypto.createHmac('sha512', hashSecret);
    const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnpParams.vnp_SecureHash = secureHash; // Thêm chữ ký vào tham số

    // Tạo URL thanh toán
    const vnpUrl = `${process.env.VNP_URL}?${querystring.stringify(vnpParams)}`;
    return vnpUrl;
};
