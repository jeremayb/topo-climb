import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Field name is mandatory."],
    },
    description:{
        type:String,
        required:[true, "A description is mandatory."]
    },
    permissions_list:{
        type:String,
        required:[true, "A permissions list is mandatory."]
    }
    
})

const Role = mongoose.models.role || mongoose.model("role", roleSchema);

export default Role;