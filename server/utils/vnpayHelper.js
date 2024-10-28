// utils/vnpayHelper.js
import querystring from 'querystring';
import crypto from 'crypto';

const vnp_TmnCode = 'YOUR_TMN_CODE';
const vnp_HashSecret = 'YOUR_HASH_SECRET';
const vnp_ReturnUrl = 'YOUR_RETURN_URL';
const vnp_Url = 'https://pay.vnpay.vn/vpcpay.html';

export const createVnpayUrl = (payment) => {
    let createDate = new Date().toISOString().slice(0, 19).replace(/T|-|:/g, '');
    
    let vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: vnp_TmnCode,
        vnp_Amount: payment.amount * 100,
        vnp_CurrCode: 'VND',
        vnp_TxnRef: payment.transactionId,
        vnp_OrderInfo: payment.orderInfo,
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: '127.0.0.1',
        vnp_CreateDate: createDate,
        vnp_Locale: 'vn'
    };

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params);
    let hmac = crypto.createHmac('sha512', vnp_HashSecret);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;
    let vnpUrl = vnp_Url + '?' + querystring.stringify(vnp_Params);
    return vnpUrl;
};

export const verifyVnpayResponse = (vnp_Params) => {
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params);
    let hmac = crypto.createHmac('sha512', vnp_HashSecret);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return secureHash === signed;
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]);
    }
    return sorted;
}


