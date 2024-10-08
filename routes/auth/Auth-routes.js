import express from 'express';
import {
    changeUserPassword,
    loggedUser,
    logoutUser,
    sendUserPasswordResetEmail,
    uploadProfile,
    UserLogin,
    userPasswordReset,
    UserRegistration
} from "../../controllers/Auth-userControllers.js"
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import checkUserAuth from '../../middleware/authMiddleware.js';
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

// Middleware check routes
// router.use('/changepassword', checkUserAuth);
// router.use('/loggeduser', checkUserAuth);

// Public routes
router.post("/register", upload.single('image'), UserRegistration);
router.post("/login", UserLogin);
router.post("/logout", logoutUser);
router.post('/forgot-password', sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token', userPasswordReset);

// protected routes
router.post('/changepassword', checkUserAuth, changeUserPassword);
router.get('/loggeduser', checkUserAuth, loggedUser);
router.put('/update-user-profile', checkUserAuth, upload.single('image'), uploadProfile);


////////////////////////  **************************  /////////////////////////////
export default router;
