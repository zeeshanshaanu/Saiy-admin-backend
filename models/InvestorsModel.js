import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const DocumentSchema = new mongoose.Schema({
    fileName: { type: String, },
    fileUrl: { type: String, },
    dateOfCreation: { type: Date, default: Date.now },
});

<<<<<<< HEAD

const investorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, default: 'Active' },
=======
const investorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String },
    level: { type: String },
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
    iban: { type: String },
    phone: { type: String, },
    address: { type: String, },
    image: { type: String },
<<<<<<< HEAD
=======
    creationOn: { type: Date, default: Date.now },
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
    documents: [DocumentSchema],

});

const InvestorModel = mongoose.model('Investor', investorSchema);

export default InvestorModel
