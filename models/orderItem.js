
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    order : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'order'
    },
    status : {
        type : String,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    time : {
        type : datetime
    }


});

export default mongoose.model("orderItem", billHisrSchema);