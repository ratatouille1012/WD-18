import express from 'express';
import { addToCart, getCart, updateCart, removeFromCart } from '../controllers/cart.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const Cartrouter = express.Router();

// Thêm sản phẩm vào giỏ hàng
Cartrouter.post('/add', verifyUser, addToCart);

// Lấy giỏ hàng của user
Cartrouter.get('/', verifyUser, getCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
Cartrouter.put('/update', verifyUser, updateCart);

// Xóa sản phẩm khỏi giỏ hàng
Cartrouter.delete('/remove', verifyUser, removeFromCart);

export default Cartrouter;
