import mongoose from "mongoose"

const sectorSchema = new mongoose.Schema({
    sector_name: {
        type: String,
        required: [true, "Sector name is mandatory."],
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
        required: [true, "Please provide a parent spot."]
    },
    area: {
        type: { type: String, enum: ['Polygon'], required: true },
        coordinates: { type: [[Number]], required: true },
    },
    images: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
            required: false 
        }]
});

const Sector = mongoose.models.Sector || mongoose.model("Sector", sectorSchema);

export default Sector;