
import { imageUploadUtil } from '../helpers/ImageUpload-cloudinary.js';
import Investor from "../models/InvestorsModel.js"
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

//  uploadInvestorImage
export const uploadInvestorImage = async (req, res) => {
    try {
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const Url = `data:${req.file.mimetype};base64,${b64}`;
            const uploadResult = await imageUploadUtil(Url);

            res.status(200).send({ imageUrl: uploadResult.secure_url });
        } else {
            res.status(400).send({ message: "No image provided" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error uploading image", error });
    }
};

//  Create-Investor
export const CreateInvestor = async (req, res) => {
    const { email, documents, recentActivities, transactionHistory } = req.body;
    const existingInvestor = await Investor.findOne({ email });
    if (existingInvestor) {
        return res.send({ status: 'failed', message: 'Email already exists' });
    }
    const documentList = documents.map(doc => ({
        fileName: doc.fileName,
        fileType: doc.fileType,
        fileUrl: doc.fileUrl
    }));

    try {
        const investor = new Investor({
            name: req.body.name,
            email: req.body.email,
            status: req.body.status,
            iban: req.body.iban,
            phone: req.body.phone,
            address: req.body.address,
            image: req.body.image,
            // 
            documents: documentList,  // Arrays parsed directly from JSON
            recentActivities: recentActivities,
            transactionHistory: transactionHistory
        });
        await investor.save();
        res.status(201).send({
            status: 'success',
            message: 'Investor created successfully',
        });
    } catch (error) {
        console.error('Error creating investor:', error);
        res.status(400).send({
            status: 'failed',
            message: 'Error creating investor',
            error
        });
    }
}

// Get-Investors
export const GetInvestors = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
        if (id) {
            // If ID is provided, fetch the specific investor
            const investor = await Investor.findById(id);
            if (!investor) {
                return res.status(404).send({
                    status: 'failed',
                    message: 'Investor not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                data: investor
            });
        } else {
            // If no ID is provided, fetch all investors
            const investors = await Investor.find({});
            return res.status(200).send({
                status: 'success',
                data: investors
            });
        }
    } catch (error) {
        console.error('Error fetching investors:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching investors',
            error
        });
    }
};
