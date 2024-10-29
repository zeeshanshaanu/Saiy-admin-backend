import mongoose from "mongoose";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const PortfolioSchema = new mongoose.Schema({
    image: { type: String },
    name: { type: String, required: true },
    min_investment: { type: Number },
    max_investment: { type: Number },
    withdrawal_Period: { type: String },
});

const DocumentSchema = new mongoose.Schema({
    fileName: { type: String, },
    fileUrl: { type: String, },
    dateOfCreation: { type: Date, default: Date.now },
});

const NotificationSchema = new mongoose.Schema({
    portfolio: PortfolioSchema,
    subject: { type: String, required: true, },
    content: { type: String },
    creationOn: { type: Date, default: Date.now },
    documents: [DocumentSchema],
})

const NotificationModel = mongoose.model('Notifications', NotificationSchema);
export default NotificationModel