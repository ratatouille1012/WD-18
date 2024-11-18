import mongoose from 'mongoose';

const momoTransactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  requestId: { type: String, required: true },
  amount: { type: Number, required: true },
  orderInfo: { type: String, required: true },
  resultCode: { type: Number },
  message: { type: String },
  transId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const MomoTransaction = mongoose.model('MomoTransaction', momoTransactionSchema);

export default MomoTransaction;
