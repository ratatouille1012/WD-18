import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    name : {
        type : [String],
        required : true
    }
});

export default mongoose.model("image", imageSchema);