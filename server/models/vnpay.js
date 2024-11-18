import mongoose from 'mongoose';

const VnpaySchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    bankCode: { type: String },
    transactionId: { type: String },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Vnpay = mongoose.model('Vnpay', VnpaySchema);
export default Vnpay;
