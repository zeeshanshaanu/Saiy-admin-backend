import { imageUploadUtil } from "../helpers/ImageUpload-cloudinary.js";
import WithdrawalModel from "../models/Withdrawal-Model.js"
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

// create
export const CreateWithdrawal = async (req, res) => {
    const { email } = req.body;
    const existingWithdrawal = await WithdrawalModel.findOne({ email });

    if (existingWithdrawal) {
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
        const NewWithdrawal = new WithdrawalModel({
            image: imageUrl,
            name: req.body.name,
            email: req.body.email,
            withdrawal_amount: req.body.withdrawal_amount,
            withdrawal_status: req.body.withdrawal_status,
            Request_date: req.body.Request_date,
            KYC_status: req.body.KYC_status,
        })
        await NewWithdrawal.save();
        res.status(201).send({
            status: 'success',
            message: 'Withdrawal created successfully',
        })
    } catch (error) {
        console.error('Error creating Withdrawal:', error);
        res.status(400).send({
            status: 'failed',
            message: 'Error creating Withdrawal',
            error: error.message
        });
    }
}

// get
export const GetWithdrawals = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const Withdrawal = await WithdrawalModel.findById(id);
            if (!Withdrawal) {
                return res.status(404).send({
                    status: 'failed',
                    message: 'Withdrawal not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                data: Withdrawal
            });
        } else {
            const Withdrawal = await WithdrawalModel.find({});
            return res.status(200).send({
                status: 'success',
                data: Withdrawal
            });
        }
    } catch (error) {
        console.error('Error fetching Withdrawals:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching Withdrawal',
            error
        });
    }
}

// delete
export const DeleteWithdrawal = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send({
                status: 'error',
                message: 'Withdrawal ID is required',
            });
        }
        const Withdrawal = await WithdrawalModel.findByIdAndDelete(id);
        if (!Withdrawal) {
            return res.status(404).send({
                status: 'error',
                message: 'Withdrawal not found',
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Withdrawal deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting Withdrawal:', error);
        return res.status(500).send({
            status: 'error',
            message: 'Error deleting Withdrawal',
            error: error.message,
        });
    }
}

