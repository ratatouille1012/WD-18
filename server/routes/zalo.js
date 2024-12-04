import {Router} from 'express';
import {createPayment,  paymentCallback, checkStatusOrder} from '../controllers/zalo.js'
const zalorouter = Router();

zalorouter.post('/create', createPayment );

zalorouter.get('/callback', paymentCallback);

zalorouter.get("/check-status-order", checkStatusOrder);
export default zalorouter;