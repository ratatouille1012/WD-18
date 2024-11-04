import { Router } from 'express';
import { createPayment, zalopayCallback } from '../controllers/zalo.js';
const ZaloPayrouter = Router();

// Route để tạo thanh toán
ZaloPayrouter.post('/create', createPayment);

// Route callback khi ZaloPay gửi kết quả thanh toán
ZaloPayrouter.post('/callback', zalopayCallback);

export default ZaloPayrouter;