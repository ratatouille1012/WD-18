import mongoose from "mongoose";
const momoSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("momo", momoSchema);