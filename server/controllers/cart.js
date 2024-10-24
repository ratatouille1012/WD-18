import Cart from '../models/cart.js';
import Variant from '../models/variant.js';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { variantId, variantQuantity } = req.body;

        // Kiểm tra xem variant có tồn tại không
        const variant = await Variant.findById(variantId);
        if (!variant) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Tìm giỏ hàng của user
        let cart = await Cart.findOne({ user: req.user._id, variantId });
        if (cart) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            cart.variantQuantity += variantQuantity;
        } else {
            // Nếu sản phẩm chưa có trong giỏ, thêm mới
            cart = new Cart({
                user: req.user._id,
                variantId,
                variantQuantity,
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy giỏ hàng của user
export const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id }).populate('variantId');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCart = async (req, res) => {
    try {
        const { cartId, variantQuantity } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }

        cart.variantQuantity = variantQuantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
    try {
        const { cartId } = req.body;

        const cart = await Cart.findByIdAndDelete(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }

        res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
