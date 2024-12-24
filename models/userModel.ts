import mongoose from "mongoose"
const Role = require('./roleModel').schema

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:[true, "Please provide you're first name."],
    },
    last_name:{
        type: String,
        required:[true, "Please provide you're last name."],
    },
    email:{
        type: String,
        required:[true, "Please provide you're email."],
    },
    password:{
        type: String,
        required:[true, "Please provide a password."],
    },
    role:{
        type:[Role],
        require:[true],
        default: {
            id:2
        }
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpriy:Date,
    verifyToken:String,
    verifyTokenExpiry:String, 
})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;