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
    endDate : {
        type : Date,
    }
}
,
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("voucher", voucherSchema);