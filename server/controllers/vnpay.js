import orderPay from '../models/vnpay.js'
import Transaction from '../models/transaction.js'
import moment from 'moment'
import crypto from 'crypto'
import vnPayConfig from '../utils/config.js'
import querystring from 'querystring'

export const createPaymentUrl = async (req, res) => {
  try {
      let { amount, bankCode, language } = req.body;
      let date = new Date();
      let createDate = moment(date).format('YYYYMMDDHHmmss');
      let orderId = moment(date).format('DDHHmmss');

      let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      const order = new orderPay({
          orderId,
          amount,
          paymentStatus: 'pending'
      });
      await order.save();

      let vnp_Params = {
          'vnp_Version': '2.1.0',
          'vnp_Command': 'pay',
          'vnp_TmnCode': vnPayConfig.vnp_TmnCode,
          'vnp_Locale': language || 'vn',
          'vnp_CurrCode': 'VND',
          'vnp_TxnRef': orderId,
          'vnp_OrderInfo': `Thanh toan cho ma GD: ${orderId}`,
          'vnp_OrderType': 'other',
          'vnp_Amount': amount * 100,
          'vnp_ReturnUrl': config.vnp_ReturnUrl,
          'vnp_IpAddr': ipAddr,
          'vnp_CreateDate': createDate
      };
      if (bankCode) vnp_Params['vnp_BankCode'] = bankCode;

      vnp_Params = sortObject(vnp_Params);

      let signData = querystring.stringify(vnp_Params, { encode: false });
      let hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
      let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;

      let vnpUrl = config.vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });
      res.redirect(vnpUrl);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const paymentReturn = async (req, res) => {
  try {
      let vnp_Params = req.query;
      let secureHash = vnp_Params['vnp_SecureHash'];

      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
      vnp_Params = sortObject(vnp_Params);

      let signData = querystring.stringify(vnp_Params, { encode: false });
      let hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
      let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

      if (secureHash === signed) {
          let orderId = vnp_Params['vnp_TxnRef'];
          let responseCode = vnp_Params['vnp_ResponseCode'];

          const order = await orderPay.findOne({ orderId });
          if (order) {
              order.paymentStatus = responseCode === '00' ? 'success' : 'failed';
              await order.save();

              const transaction = new Transaction({
                  transactionId: vnp_Params['vnp_TransactionNo'],
                  orderId,
                  amount: order.amount,
                  responseCode,
                  secureHash: secureHash
              });
              await transaction.save();

              res.status(200).json({ message: 'Payment status updated', paymentStatus: order.paymentStatus });
          } else {
              res.status(404).json({ message: 'Order not found' });
          }
      } else {
          res.status(400).json({ message: 'Invalid signature' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const checkOrderStatus = async (req, res) => {
  try {
      const { orderId } = req.params;
      const order = await orderPay.findOne({ orderId });

      if (order) {
          res.status(200).json({ paymentStatus: order.paymentStatus });
      } else {
          res.status(404).json({ message: 'Order not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
