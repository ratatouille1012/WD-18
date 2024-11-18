import Cart from '../models/cart.js';
import Variant from '../models/variant.js';
import Product from '../models/Product.js';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { variantId, variantQuantity } = req.body;

        // Kiểm tra xem variant có tồn tại không
        const variant = await Product.findOne({ "variant._id": variantId });
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
        const cartItems = await Cart.find({ user: req.user._id }).populate('_id', 'variant');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCart = async (req, res) => {
    try {
        const { _id, variantQuantity } = req.body;
        const cart = await Cart.findById(_id);
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
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }

        res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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


export const deleteUnchecked = async (req, res) => {
    try {
        const { itemIds } = req.body; 

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
        }
        const result = await Cart.deleteMany({ 
            user: req.user._id, 
            _id: { $in: itemIds } 
        });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Đã xóa các sản phẩm không được chọn khỏi giỏ hàng" });
        } else {
            res.status(404).json({ message: "Không tìm thấy sản phẩm nào trong giỏ hàng để xóa" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
