import mongoose from 'mongoose'
const zaloSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  amount: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model("zalo", zaloSchema);