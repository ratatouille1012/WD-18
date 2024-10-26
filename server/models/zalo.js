import mongoose from 'mongoose'
const zaloSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("zalo", zaloSchema);