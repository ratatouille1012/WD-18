import express from 'express';
import {
    createOrderHistory,
    getAllOrderHistory,
    getOrderHistoryById,
    updateOrderHistory,
    deleteOrderHistory,
    getOrderHistoryByOrderAndUser
} from '../controllers/orderHis.js';

const router = express.Router();

router.post('/', createOrderHistory);
router.get('/', getAllOrderHistory); 
router.get('/:id', getOrderHistoryById);
router.get('/getStt/:orderId', getOrderHistoryByOrderAndUser );
router.put('/:id', updateOrderHistory); 
router.delete('/:id', deleteOrderHistory); 

export default router;
