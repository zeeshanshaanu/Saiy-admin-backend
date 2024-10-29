import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const userSchema = new mongoose.Schema({
<<<<<<< HEAD

    name: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    recoveryEmail: { type: String },
=======
    image: { type: String },
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    recoveryEmail: { type: String },
    password: { type: String, required: true, },
    phone: { type: String },
    address: { type: String },
    level: { type: String },
    creationOn: { type: Date, default: Date.now },
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
    fa: { type: String }
})

const UserModel = mongoose.model('user', userSchema);
export default UserModel