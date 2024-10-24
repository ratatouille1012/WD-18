import mongoose from "mongoose";
import { type } from "os";

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    variantId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'variant'
    },
    variantQuantity : {
        type : mongoose.Schema.Types.Number,
        ref : 'variant'
    }
});

export default mongoose.model("cart", cartSchema);