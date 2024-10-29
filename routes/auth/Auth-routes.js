import express from 'express';
import {
    changeUserPassword,
<<<<<<< HEAD
=======
    DeleteUser,
    GetRegistredUsers,
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
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

<<<<<<< HEAD
// Middleware check routes
// router.use('/changepassword', checkUserAuth);
// router.use('/loggeduser', checkUserAuth);

=======
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
// Public routes
router.post("/register", upload.single('image'), UserRegistration);
router.post("/login", UserLogin);
router.post("/logout", logoutUser);
router.post('/forgot-password', sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token', userPasswordReset);

// protected routes
router.post('/changepassword', checkUserAuth, changeUserPassword);
router.get('/loggeduser', checkUserAuth, loggedUser);
<<<<<<< HEAD
router.put('/update-user-profile', checkUserAuth, upload.single('image'), uploadProfile);


=======
router.get('/all-Users/:id?', checkUserAuth, GetRegistredUsers);
router.delete('/delete-user/:id', checkUserAuth, DeleteUser);
router.put('/update-user-profile', checkUserAuth, upload.single('image'), uploadProfile);

>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
////////////////////////  **************************  /////////////////////////////
export default router;
