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

const portfolioSchema = new mongoose.Schema({
    image: { type: String },
    name: { type: String, required: true },
    min_investment: { type: Number },
    max_investment: { type: Number },
    investors: [InvestorsSchema],
    withdrawal_Period: { type: String },
    creationOn: { type: Date, default: Date.now },
});

const PortfolioModel = mongoose.model('Portfolios', portfolioSchema);

export default PortfolioModel
