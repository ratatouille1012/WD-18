import mongoose from "mongoose";
const vnpaySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  vnp_TransactionStatus: { type: String, required: true },
  vnp_ResponseCode: { type: String, required: true },
  vnp_TransactionNo: { type: String, required: true },
  vnp_BankCode: { type: String, required: true },
  vnp_PayDate: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("vnpay", vnpaySchema);