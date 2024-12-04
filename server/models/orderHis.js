
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
    description: {
        type : String,
    },
    user : {
        type : String,
        ref : 'user'
    },
    time : {
        type : Date
    }
},
{
  timestamps: true,
  versionKey: false,
});

export default mongoose.model("orderHis", orderHisSchema);