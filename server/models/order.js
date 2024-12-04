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
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "Product"
            },
            color : {
                type : String
            },
            size : {
                type : String
            },
            price : {
                type : Number
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
        type : String,
        default:"none",
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
    },
    payment : {
       type : String,
    }
    ,orderHis : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "orderHis",
    },
}
,
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("order", orderSchema);