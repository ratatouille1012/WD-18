// models/paymentModel.js
import mongoose from "mongoose";
// Định nghĩa schema cho giao dịch thanh toán
const paymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },

    amount: {
        type: Number,
        required: true
    },
    orderInfo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    }
});

// Tạo model Payment từ schema
export default mongoose.model("payment", paymentSchema);
