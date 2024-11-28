import mongoose from 'mongoose';

const zaloSchema = new mongoose.Schema({
  app_user: { type: String, required: true },
  amount: { type: Number, required: true },
  app_trans_id: { type: String, unique: true, required: true },
  zp_trans_id: { type: String },
  description: { type: String },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  callback_response: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', zaloSchema);

export default Payment;
