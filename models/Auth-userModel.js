import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const userSchema = new mongoose.Schema({

    name: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    recoveryEmail: { type: String },
    fa: { type: String }
})

const UserModel = mongoose.model('user', userSchema);
export default UserModel