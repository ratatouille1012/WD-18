import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    resultCode: { type: Number },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("payment", paymentTransactionSchema);