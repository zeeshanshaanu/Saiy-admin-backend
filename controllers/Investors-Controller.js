
import { documentUploadUtil, imageUploadUtil } from '../helpers/ImageUpload-cloudinary.js';
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

            res.status(200).send({
                status: 'success',
                message: "image upload successfully.!",
                imageUrl: uploadResult.secure_url
            });
        } else {
            res.status(400).send({ message: "No image provided" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error uploading image", error });
    }
};

export const uploadInvestorDocument = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            const documentUrls = [];

            for (const file of req.files) {
                const uploadResult = await documentUploadUtil(file.buffer, file.originalname); // Use file.buffer and file.originalname

                documentUrls.push(uploadResult.secure_url); // Store each uploaded document's URL
            }
            res.status(200).send({
                status: 'success',
                message: "Documents uploaded successfully!",
                documentUrls, // Return the array of document URLs
            });
        } else {
            res.status(400).send({ message: "No documents provided" });
        }
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: "Error uploading documents",
            error
        });
    }
};

//  Create-Investor
export const CreateInvestor = async (req, res) => {
    const { email } = req.body;
    const existingInvestor = await Investor.findOne({ email });

    if (existingInvestor) {
        return res.send({ status: 'failed', message: 'Email already exists' });
    }
    const imageFile = req.files['image'] ? req.files['image'][0] : null; // Single image
    const documentFiles = req.files['documents'] || []; // Multiple documents

    let imageUrl = ""
    if (imageFile) {
        const b64 = Buffer.from(imageFile.buffer).toString("base64");
        const Url = `data:${imageFile.mimetype};base64,${b64}`;
        const uploadResult = await imageUploadUtil(Url);
        imageUrl = uploadResult.secure_url;
    }

    const documentUrls = [];
    if (documentFiles.length > 0) {
        for (const file of documentFiles) {
            const uploadResult = await documentUploadUtil(file.buffer, file.originalname);
            documentUrls.push(uploadResult.secure_url);
        }
    }

    const extractFileName = (url) => {
        const fullFileName = url.split('/').pop();
        return fullFileName.split('.')[1];
    };
    const documents = documentUrls.map(url => ({
        fileName: extractFileName(url),
        fileUrl: url,
        dateOfCreation: new Date()
    }));

    // console.log("documentUrls--->>>>", documentUrls);

    try {
        const investor = new Investor({
            name: req.body.name,
            email: req.body.email,
            status: req.body.status || "pending",
            level: req.body.level || "invesor",
            iban: req.body.iban,
            phone: req.body.phone,
            address: req.body.address,
            image: imageUrl,
            documents: documents,

        });
        await investor.save();
        res.status(201).send({
            status: 'success',
            message: 'Investor created successfully',
            investor,
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
    const { id } = req.params;
    try {
        if (id) {
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

// Update-Investor
export const UpdateInvestor = async (req, res) => {
    const { id } = req.params;
    try {
        const existingInvestor = await Investor.findById(id);
        if (!existingInvestor) {
            return res.status(404).send({
                status: 'failed',
                message: 'Investor not found',
            });
        }

        let imageUrl = existingInvestor?.image;
        if (req?.files?.image && req.files?.image?.length > 0) {
            const image = req?.files?.image[0];
            const b64 = Buffer.from(image?.buffer).toString("base64");
            const Url = `data:${image?.mimetype};base64,${b64}`;
            const uploadResult = await imageUploadUtil(Url);
            imageUrl = uploadResult?.secure_url;
        }
        // 
        let documentList = existingInvestor.documents;
        if (req.files?.documents) {
            documentList = req.files.documents.map(doc => ({
                fileName: doc?.fileName,
                fileType: doc?.mimetype,
                fileUrl: doc?.fileUrl
            }));
        }
        // Update investor fields
        const updatedInvestor = await Investor.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: req.body.name || existingInvestor.name,
                    email: req.body.email || existingInvestor.email,
                    status: req.body.status || existingInvestor.status,
                    iban: req.body.iban || existingInvestor.iban,
                    phone: req.body.phone || existingInvestor.phone,
                    address: req.body.address || existingInvestor.address,
                    image: imageUrl,
                    documents: documentList,
                }
            },
            { new: true }
        );

        res.status(200).send({
            status: 'success',
            message: 'Investor updated successfully',
            investor: updatedInvestor,
        });

    } catch (error) {
        console.error('Error updating investor:', error);
        res.status(500).send({
            status: 'failed',
            message: 'Error updating investor',
            error: error.message,
        });
    }
};

// Delete-Investor
export const DeleteInvestor = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send({
                status: 'error',
                message: 'Investor ID is required',
            });
        }

        // Find and delete the investor by ID
        const investor = await Investor.findByIdAndDelete(id);

        if (!investor) {
            return res.status(404).send({
                status: 'error',
                message: 'Investor not found',
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Investor deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting investor:', error);
        return res.status(500).send({
            status: 'error',
            message: 'Error deleting investor',
            error,
        });
    }
};
