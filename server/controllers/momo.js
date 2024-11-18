import { createMomoPayment } from '../utils/momoService.js';
import MomoTransaction from '../models/transaction.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const createPayment = async (req, res) => {
  try {
    const { orderId, amount, orderInfo } = req.body;
    const paymentData = await createMomoPayment(orderId, amount, orderInfo);
    res.status(200).json(paymentData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const handleReturnUrl = async (req, res) => {
  try {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.query;

    const rawSignature = `accessKey=${process.env.MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest('hex');

    if (signature !== generatedSignature) {
      return res.status(400).send('Invalid signature');
    }

    await MomoTransaction.findOneAndUpdate(
      { orderId },
      { resultCode, message, transId },
      { new: true }
    );

    if (resultCode === '0') {
      res.redirect(`/payment-success?orderId=${orderId}&amount=${amount}`);
    } else {
      res.redirect(`/payment-failed?orderId=${orderId}&message=${message}`);
    }
  } catch (error) {
    res.status(500).send('Error processing payment result');
  }
};
