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
<<<<<<< HEAD
=======
    image: { type: String },
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
    name: { type: String, required: true },
    min_investment: { type: Number },
    max_investment: { type: Number },
    investors: [InvestorsSchema],
    withdrawal_Period: { type: String },
<<<<<<< HEAD
=======
    creationOn: { type: Date, default: Date.now },
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
});

const PortfolioModel = mongoose.model('Portfolios', portfolioSchema);

export default PortfolioModel
