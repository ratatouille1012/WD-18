import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    code : {
        type : String,
        required : true
    },
    value : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    maxPrice : {
        type : Number,
    },
    startDate : {
        type : Date,
    },
    endDate : {
        type : Date,
    },
    quantity : {
        type : Number,
    },
    usedQuantity : {
        type : Number,
    }
});

export default mongoose.model("voucher", voucherSchema);