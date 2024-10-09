import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
        required : true
    },
    color : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "color"
    },
    size : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "size"
    },
    quantity : {
        type : Number,
    },
    importPrice : {
        type : Number,
    },
    listPrice : {
        type : Number,
    },
    salePrice : {
        type : Number,
    },
    isShow : {
        type : boolean,
    }
});

export default mongoose.model("variant", variantSchema);