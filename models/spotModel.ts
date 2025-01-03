import mongoose from "mongoose"

const spotSchema = new mongoose.Schema({
    spot_name: {
        type: String,
        required: [true, "Please provide a spot name."]
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, "Please provide a location."]
    },
    nearest_parking_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, "Please provide a location."]
    },
    sectors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector',
        required: [true, "Please provide a list of sectors."]
    }],
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false 
    }
})

const Spot = mongoose.models.spots || mongoose.model("spots", spotSchema);

export default Spot;