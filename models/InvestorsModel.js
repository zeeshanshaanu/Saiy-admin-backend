import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const DocumentSchema = new mongoose.Schema({
    fileName: { type: String, },
    fileUrl: { type: String, },
    dateOfCreation: { type: Date, default: Date.now },
});

const investorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String },
    level: { type: String },
    iban: { type: String },
    phone: { type: String, },
    address: { type: String, },
    image: { type: String },
    creationOn: { type: Date, default: Date.now },
    documents: [DocumentSchema],

});

const InvestorModel = mongoose.model('Investor', investorSchema);

export default InvestorModel
