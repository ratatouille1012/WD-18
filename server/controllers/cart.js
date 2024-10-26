import Cart from '../models/cart.js';
import Variant from '../models/variant.js';
<<<<<<< HEAD
import Product from '../models/Product.js';
=======

>>>>>>> origin/Tanh
// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { variantId, variantQuantity } = req.body;

        // Kiểm tra xem variant có tồn tại không
<<<<<<< HEAD
        const variant = await Product.findOne({ "variant._id": variantId });
=======
        const variant = await Variant.findById(variantId);
>>>>>>> origin/Tanh
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
<<<<<<< HEAD
        const cartItems = await Cart.find({ user: req.user._id }).populate('_id', 'variant');
=======
        const cartItems = await Cart.find({ user: req.user._id }).populate('variantId');
>>>>>>> origin/Tanh
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCart = async (req, res) => {
    try {
<<<<<<< HEAD
        const { _id, variantQuantity } = req.body;

        const cart = await Cart.findById(_id);
=======
        const { cartId, variantQuantity } = req.body;

        const cart = await Cart.findById(cartId);
>>>>>>> origin/Tanh
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }

        // Cập nhật số lượng sản phẩm
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
<<<<<<< HEAD
        const cart = await Cart.findByIdAndDelete(req.params.id);
=======
        const { cartId } = req.body;

        const cart = await Cart.findByIdAndDelete(cartId);
>>>>>>> origin/Tanh
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }

        res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
<<<<<<< HEAD

export const removeAllCart = async (req, res) => {
    try {
        const result = await Cart.deleteMany({  user: req.user._id}); 
        if (result.deletedCount > 0) { 
            res.status(200).json({ message: "Đã xóa tất cả sản phẩm khỏi giỏ hàng" });
        } else {
            res.status(404).json({ message: "Không tìm thấy sản phẩm nào trong giỏ hàng" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


=======
>>>>>>> origin/Tanh
