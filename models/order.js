import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
    billCode : {
        type : String,
        required : true
    },
    billStatus : {
        type : String,

    },
    total : {
        type : Number,
    },
    voucher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "voucher"
    },
    ship : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ship"
    }
});

export default mongoose.model("order", orderSchema);