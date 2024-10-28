import { imageUploadUtil } from "../helpers/ImageUpload-cloudinary.js";
import AssociateModel from "../models/AssociatesModel.js"
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

// create
export const CreateAssociate = async (req, res) => {
    const { email } = req.body;
    const existingAssociate = await AssociateModel.findOne({ email });

    if (existingAssociate) {
        return res.send({ status: "failed", message: 'Email already exists' })
    }
    let imageUrl = "";
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const Url = `data:${req.file.mimetype};base64,${b64}`;
        const uploadResult = await imageUploadUtil(Url);
        imageUrl = uploadResult.secure_url; // Get the URL of the uploaded image
    }

    const { investors } = req.body;
    let investorsArray = [];

    if (investors) {
        investorsArray = JSON?.parse(investors);
    }

    try {
        const NewAssociate = new AssociateModel({
            image: imageUrl,
            name: req.body.name,
            email: req.body.email,
            level: req.body.level || 'pending',
            earn: req.body.earn,
            paid_out: req.body.paid_out,
            investors: investorsArray,
        })
        await NewAssociate.save();
        res.status(201).send({
            status: 'success',
            message: 'Associate created successfully',
        })
    } catch (error) {
        console.error('Error creating Associate:', error);
        res.status(400).send({
            status: 'failed',
            message: 'Error creating associate',
            error: error.message
        });
    }
}

// get
export const GetAssociate = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const Associate = await AssociateModel.findById(id);
            if (!Associate) {
                return res.status(404).send({
                    status: 'failed',
                    message: 'Associate not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                data: Associate
            });
        } else {
            const Associate = await AssociateModel.find({});
            return res.status(200).send({
                status: 'success',
                data: Associate
            });
        }
    } catch (error) {
        console.error('Error fetching Associates:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching Associate',
            error
        });
    }
}

// update
export const UpdateAssociate = async (req, res) => {
    const { id } = req.params;
    // 
    try {
        const Associate = await AssociateModel.findById(id);
        if (!Associate) {
            return res.status(404).send({
                status: 'failed',
                message: 'Associate not found'
            });
        }

        let imageUrl = Associate?.image;
        if (req?.files?.image && req.files?.image?.length > 0) {
            const image = req?.files?.image[0];
            const b64 = Buffer.from(image?.buffer).toString("base64");
            const Url = `data:${image?.mimetype};base64,${b64}`;
            const uploadResult = await imageUploadUtil(Url);
            imageUrl = uploadResult?.secure_url;
        }

        const { investors } = req.body;
        let investorsArray = [];
        if (investors) {
            investorsArray = JSON.parse(investors);
        }

        const updatedAssociate = await AssociateModel.findByIdAndUpdate(
            id, {
            $set: {
                name: req.body.name || Associate?.name,
                email: req.body.email || Associate?.email,
                level: req.body.level || Associate?.level,
                earn: req.body.earn || Associate?.earn,
                paid_out: req.body.paid_out || Associate?.paid_out,
                investors: investorsArray || Associate?.investors,
                image: imageUrl,
            }
        }, { new: true }
        );
        res.status(200).send({
            status: 'success',
            message: 'Associate updated successfully',
            associate: updatedAssociate,
        });

    } catch (error) {
        console.error('Error fetching associates:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching associates',
            error
        });
    }
}

// delete
export const DeleteAssociate = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send({
                status: 'error',
                message: 'Associate ID is required',
            });
        }
        const Associate = await AssociateModel.findByIdAndDelete(id);
        if (!Associate) {
            return res.status(404).send({
                status: 'error',
                message: 'Associate not found',
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Associate deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting Associate:', error);
        return res.status(500).send({
            status: 'error',
            message: 'Error deleting Associate',
            error: error.message,
        });
    }
}
