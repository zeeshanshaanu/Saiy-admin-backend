import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/Auth-userModel.js';
import { imageUploadUtil } from '../helpers/ImageUpload-cloudinary.js';

////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

// handle Image Upload
export const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const Url = "data" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(Url);
        res.send({ status: true, result });
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Image uploading failed.!", });
    }
}

// User-Registration
export const UserRegistration = async (req, res) => {
    const { name, email, password, confirm_password, phone, address, recoveryEmail, fa } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
        res.send({ status: 'failed', message: 'Email already exists' });
    } else {
        if (name && email && password && confirm_password) {
            if (password === confirm_password) {
                try {
                    const salt = await bcrypt.genSalt(8);
                    const hashPassword = await bcrypt.hash(password, salt);

                    // Handle image upload if an image is provided
                    let imageUrl = "";
                    if (req.file) {
                        const b64 = Buffer.from(req.file.buffer).toString("base64");
                        const Url = `data:${req.file.mimetype};base64,${b64}`;
                        const uploadResult = await imageUploadUtil(Url);
                        imageUrl = uploadResult.secure_url; // Get the URL of the uploaded image
                    }
                    const NewUser = new UserModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                        phone: phone,
                        address: address,
                        recoveryEmail: recoveryEmail,
                        fa: fa,
                        image: imageUrl
                    });
                    await NewUser.save();
                    const saved_user = await UserModel.findOne({ email: email });

                    // Generate JWT Token
                    const token = jwt.sign(
                        { userID: saved_user },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '5h' }
                    );

                    res.status(201).send({
                        status: 'success',
                        message: 'Registration Success',
                        token: token,
                    });

                } catch (error) {
                    console.log(error);
                    res.send({ status: 'failed', message: 'Unable to Register' });
                }
            } else {
                res.send({
                    status: 'failed',
                    message: "Password and Confirm-Password doesn't match",
                });
            }
        } else {
            res.send({ status: 'failed', message: 'All fields are required' });
        }
    }
}

// Login-User
export const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await UserModel.findOne({ email: email });
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign(
                        { userID: user._id },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '5d' }
                    );
                    res.send({ status: 'success', message: 'Login Successfully.!', token, user });
                } else {
                    res.send({ status: 'failed', message: 'Email or Password is not valid' });
                }
            } else {
                res.send({ status: 'failed', message: 'You are not a Registered User' });
            }
        } else {
            res.send({ status: 'failed', message: 'All Fields are Required' });

        }
    }
    catch (error) {
        console.log(error);
        res.send({ status: 'failed', message: 'Unable to Login' });
    }
}

// Logout-User
export const logoutUser = (req, res) => {
    res.clearCookie("token").send({
        success: true,
        message: "Logged out successfully!",
    });
};

// Change User Password
export const changeUserPassword = async (req, res) => {
    const { password, confirm_password } = req.body;
    if (password && confirm_password) {
        if (password !== confirm_password) {
            res.send({
                status: 'failed',
                message: "New Password and Confirm New Password don't match",
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);
            await UserModel.findByIdAndUpdate(req.user._id, {
                $set: { password: newHashPassword },
            });
            res.send({
                status: 'success',
                message: 'Password changed successfully',
            });
        }
    } else {
        res.send({ status: 'failed', message: 'All Fields are Required' });
    }
};

// Get Logged In User Details
export const loggedUser = async (req, res) => {
    res.send({ user: req.user });
};

// Send Password Reset Email
export const sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const secret = user._id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '1h' });
            const link = `http://localhost:3000/ResetPassword/${user._id}/${token}`;
            // console.log(link);
            // Uncomment this to send the actual email
            // let info = await transporter.sendMail({
            //   from: process.env.EMAIL_FROM,
            //   to: user.email,
            //   subject: "Password Reset Link",
            //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
            // });
            res.send({
                status: 'success',
                message: 'Password Reset Email Sent... Please Check Your Email',
                link
            });
        } else {
            res.send({ status: 'failed', message: "Email doesn't exist" });
        }
    } else {
        res.send({ status: 'failed', message: 'Email Field is Required' });
    }
};

// Password Reset
export const userPasswordReset = async (req, res) => {
    const { password, confirm_password } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
        jwt.verify(token, new_secret);
        if (password && confirm_password) {
            if (password !== confirm_password) {
                res.send({
                    status: 'failed',
                    message: "New Password and Confirm New Password doesn't match",
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(user._id, {
                    $set: { password: newHashPassword },
                });
                res.send({
                    status: 'success',
                    message: 'Password Reset Successfully',
                });
            }
        } else {
            res.send({ status: 'failed', message: 'All Fields are Required' });
        }
    } catch (error) {
        console.log(error);
        res.send({ status: 'failed', message: 'Invalid Token' });
    }
};
