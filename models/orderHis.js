import mongoose from "mongoose";

const orderHisSchema = new mongoose.Schema({
    order : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'order'
    },
    variant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'variant'
    },
    quantity : {
        type : Number
    },
    variantPrice : {
        type : mongoose.Schema.Types.Number,
        required : true,
        ref : 'variant'
    }
});

export default mongoose.model("orderHis", billItemSchema);