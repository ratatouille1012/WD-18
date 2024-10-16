
import mongoose from "mongoose";

const orderHisSchema = new mongoose.Schema({
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
        type : Date
    }


});

export default mongoose.model("orderHis", orderHisSchema);