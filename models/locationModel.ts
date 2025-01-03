import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "Field address is mandatory."],
    },
    coordinates: {
        type: { type: String, enum: ['Point'], required: true }, 
        coordinates: { type: [Number], required: true },         
    },
});

locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;