
import mongoose from "mongoose";

const receiverSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
    },
    phone : {
       type : Number,
    },

});

export default mongoose.model("receiver", receiverSchema);