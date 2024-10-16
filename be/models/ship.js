import mongoose from "mongoose";

const shipSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
    }
});

export default mongoose.model("ship", shipSchema);