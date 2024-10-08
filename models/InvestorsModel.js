import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const DocumentSchema = new mongoose.Schema({
    fileName: { type: String, },
    fileUrl: { type: String, },
    dateOfCreation: { type: Date, default: Date.now },
});

const RecentActivitySchema = new mongoose.Schema({
    image: { type: String },
    activityName: { type: String, },
    dateOfCreation: { type: Date, default: Date.now },
    description: { type: String }
});

const TransactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
    invoice: { type: String }
});

const investorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, default: 'Active' },
    iban: { type: String },
    phone: { type: String, },
    address: { type: String, },
    image: { type: String },
    documents: [DocumentSchema],
    recentActivities: [RecentActivitySchema],
    transactionHistory: [TransactionSchema]
});

const InvestorModel = mongoose.model('Investor', investorSchema);

export default InvestorModel
