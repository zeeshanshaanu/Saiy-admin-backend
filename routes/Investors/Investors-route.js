import express from 'express';

import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import checkUserAuth from '../../middleware/authMiddleware.js';
import { CreateInvestor, GetInvestors, uploadInvestorDocument, uploadInvestorImage } from '../../controllers/Investors-Controller.js';
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

// protected routes



router.post('/upload-image', checkUserAuth, upload.single('image'), uploadInvestorImage);
router.post('/upload-document', upload.array('documents'), uploadInvestorDocument);

router.post('', checkUserAuth, CreateInvestor);
router.get('/:id?', checkUserAuth, GetInvestors);



////////////////////////  **************************  /////////////////////////////
export default router;