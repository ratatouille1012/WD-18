import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model("Brand", brandSchema);