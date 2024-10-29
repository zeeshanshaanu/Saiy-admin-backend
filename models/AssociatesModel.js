import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

const InvestorsSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    image: { type: String },
    id: { type: String },
});

const AssociateSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    KYC_status: { type: String },
    level: { type: String },
    earn: { type: String },
    paid_out: { type: String },
    image: { type: String },
    creationOn: { type: Date, default: Date.now },
    investors: [InvestorsSchema]
});

const AssociateModel = mongoose.model('Associates', AssociateSchema);

export default AssociateModel
