import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    orderCode : {
        type : String,
        required : true
    },
    orderItems : [
        {
            quantity : {
                type : Number
            },
            variantId:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product.variant'
            },
            variantQuantity : {
                type : Number,
            } 
        }
    ],
    orderStatus : {
        type : String,
        default:"Chờ xử lý"
    },
    total : {
        type : Number,
    },
    voucher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "voucher",
    },
    ship : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ship",
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
       type : Number,
       required : true
    }
    
}
,
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("order", orderSchema);