import express from 'express';
import { UserLogin, UserRegistration } from "../../controllers/Auth-userControllers.js"
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

// Middleware check routes


// Public routes
router.post("/register", upload.single('image'), UserRegistration);
router.post("/login", UserLogin);

// protected routes

export default router;
