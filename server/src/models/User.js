import mongoose from "mongoose";
const {Schema} = mongoose;
import bcrypt from "bcryptjs";
// import modelOptions from "./model.options.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

UserSchema.methods.setPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    this.password = secPass;

    // console.log("setPassword", salt, secPass);
}
UserSchema.methods.checkPassword = async function(password){
    const comparePassword = await bcrypt.compare(password, this.password);
    // console.log(comparePassword);
    return comparePassword;

    // console.log("setPassword", salt, secPass);
}

const userModel = mongoose.model('User', UserSchema);
export default userModel;