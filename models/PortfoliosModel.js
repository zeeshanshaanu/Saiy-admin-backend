import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

const InvestorsSchema = new mongoose.Schema({
    name: { type: String },
    id: { type: String },

});

const portfolioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    min_investment: { type: Number },
    max_investment: { type: Number },
    investors: [InvestorsSchema],
    withdrawal_Period: { type: String },
});

const PortfolioModel = mongoose.model('Portfolios', portfolioSchema);

export default PortfolioModel
