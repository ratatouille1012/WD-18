import {Router} from 'express';
import {createPayment, handleCallback, checkStatus} from '../controllers/zalo.js'
const zalorouter = Router();

zalorouter.post('/create', createPayment );

zalorouter.get('/callback', handleCallback);

zalorouter.get("/status/:orderId", checkStatus);
export default zalorouter;