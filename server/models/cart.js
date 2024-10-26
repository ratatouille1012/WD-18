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
        ref : 'Product.variant'
    },
    variantQuantity : {
        type : mongoose.Schema.Types.Number,
        required : true,
    }
});

export default mongoose.model("cart", cartSchema);