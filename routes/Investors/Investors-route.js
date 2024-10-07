import express from 'express';

import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import checkUserAuth from '../../middleware/authMiddleware.js';
import { CreateInvestor, GetInvestors } from '../../controllers/Investors-Controller.js';
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();



// protected routes
router.post('', checkUserAuth, upload.single('image'), CreateInvestor);
router.get('/:id?', checkUserAuth, GetInvestors);



////////////////////////  **************************  /////////////////////////////
export default router;