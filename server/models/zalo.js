import mongoose from 'mongoose';

// Tạo schema cho giao dịch
const zaloSchema = new mongoose.Schema({
  appTransId: { type: String, required: true },
  appUser: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, success, failed
  createdAt: { type: Date, default: Date.now },
});

// Xuất zalo model dưới dạng Default Export
const zalo = mongoose.model('zalo', zaloSchema);
export default zalo;