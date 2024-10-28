import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const WithdrawalSchema = new mongoose.Schema({
    image: { type: String },
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    withdrawal_amount: { type: Number },
    withdrawal_status: { type: String },
    Request_date: { type: Date, default: Date.now },
    // Request_date: { type: String },
    KYC_status: { type: String },
})

const WithdrawalModel = mongoose.model('withdrawals', WithdrawalSchema);
export default WithdrawalModel