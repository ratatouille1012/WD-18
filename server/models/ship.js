import mongoose from "mongoose";

const ShippingSchema  = new mongoose.Schema({
    detailedAddress: { type: String, required: true }, // Lưu địa chỉ chi tiết
    shippingCost: { type: Number, required: true },
    distance: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("shipping", ShippingSchema );