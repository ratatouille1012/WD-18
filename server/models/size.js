import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    name : {
        type : Number,
        required : true
    }
});

export default mongoose.model("size", sizeSchema);