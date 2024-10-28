import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const userSchema = new mongoose.Schema({
    image: { type: String },
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    recoveryEmail: { type: String },
    password: { type: String, required: true, },
    phone: { type: String },
    address: { type: String },
    status: { type: String },
    creationOn: { type: Date, default: Date.now },
    fa: { type: String }
})

const UserModel = mongoose.model('user', userSchema);
export default UserModel