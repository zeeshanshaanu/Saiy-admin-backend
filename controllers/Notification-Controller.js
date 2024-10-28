import { imageUploadUtil } from "../helpers/ImageUpload-cloudinary.js";
import NotificationModel from "../models/Notification-Model.js";
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

// create
export const CreateNotification = async (req, res) => {
    const { email } = req.body;
    const existingNotification = await NotificationModel.findOne({ email });

    if (existingNotification) {
        return res.send({ status: "failed", message: 'Email already exists' })
    }

    let imageUrl = "";
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const Url = `data:${req.file.mimetype};base64,${b64}`;
        const uploadResult = await imageUploadUtil(Url);
        imageUrl = uploadResult.secure_url; // Get the URL of the uploaded image
    }

    try {
        const NewNotification = new NotificationModel({
            image: imageUrl,
            name: req.body.name,
            email: req.body.email,
            Notification_amount: req.body.Notification_amount,
            Notification_status: req.body.Notification_status,
            Request_date: req.body.Request_date,
            KYC_status: req.body.KYC_status,
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

