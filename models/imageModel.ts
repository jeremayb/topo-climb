import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
    base64: {
        type: String,
        required: [true, "Field address is mandatory."],
    },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;