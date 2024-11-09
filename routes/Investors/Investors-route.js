import express from 'express';
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import checkUserAuth from '../../middleware/authMiddleware.js';
import {
    CreateInvestor, DeleteInvestor,
    GetInvestors,
    UpdateInvestor,
    uploadInvestorDocument,
    uploadInvestorImage
} from '../../controllers/Investors-Controller.js';
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

// protected routes
router.post('/upload-image', checkUserAuth, upload.single('image'), uploadInvestorImage);
router.post('/upload-document', upload.array('documents'), uploadInvestorDocument);

router.post(
    '',
    checkUserAuth,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'documents', maxCount: 3 }
    ]),
    CreateInvestor
);

router.put(
    '/:id',
    checkUserAuth,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'documents', maxCount: 3 }
    ]),
    UpdateInvestor
);

router.get('/:id?', GetInvestors);
router.delete('/:id', checkUserAuth, DeleteInvestor);


////////////////////////  **************************  /////////////////////////////
export default router;