import { documentUploadUtil } from "../helpers/ImageUpload-cloudinary.js";
import NotificationModel from "../models/Notification-Model.js";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

// create
export const CreateNotification = async (req, res) => {
    const { subject, content } = req.body;
    const existingNotification = await NotificationModel.findOne({ subject });

    if (existingNotification) {
        return res.send({ status: "failed", message: 'subject already exists' })
    }
    const documentFiles = req.files['documents'] || [];

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

    const { portfolio } = req.body;
    let portfolioObj = {};

    if (portfolio) {
        portfolioObj = JSON?.parse(portfolio);
    }
    
    try {
        const NewNotification = new NotificationModel({
            portfolio: portfolioObj,
            subject: subject,
            content: content,
            documents: documents,
        })
        await NewNotification.save();
        res.status(201).send({
            status: 'success',
            message: 'Notification created successfully',
        })
    } catch (error) {
        console.error('Error creating Notification:', error);
        res.status(400).send({
            status: 'failed',
            message: 'Error creating Notification',
            error: error.message
        });
    }
}

// get
export const GetNotifications = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const Notification = await NotificationModel.findById(id);
            if (!Notification) {
                return res.status(404).send({
                    status: 'failed',
                    message: 'Notification not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                data: Notification
            });
        } else {
            const Notification = await NotificationModel.find({});
            return res.status(200).send({
                status: 'success',
                data: Notification
            });
        }
    } catch (error) {
        console.error('Error fetching Notifications:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching Notification',
            error
        });
    }
}

// delete
export const DeleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send({
                status: 'error',
                message: 'Notification ID is required',
            });
        }
        const Notification = await NotificationModel.findByIdAndDelete(id);
        if (!Notification) {
            return res.status(404).send({
                status: 'error',
                message: 'Notification not found',
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Notification deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting Notification:', error);
        return res.status(500).send({
            status: 'error',
            message: 'Error deleting Notification',
            error: error.message,
        });
    }
}

