import mongoose from 'mongoose';

const vnpaySchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  VnpayId: { type: String, required: false, default: null },  // Thêm giá trị mặc định là null
  status: { type: String, default: 'Pending' },
});

const Vnpay = mongoose.model('Vnpay', vnpaySchema);

export default Vnpay;
