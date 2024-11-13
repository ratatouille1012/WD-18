import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    responseCode: { type: String },
    secureHash: { type: String },
    transactionDate: { type: Date, default: Date.now }
});
export default mongoose.model("Transaction", transactionSchema);
