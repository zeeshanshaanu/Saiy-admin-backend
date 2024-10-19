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
        { name: 'image', maxCount: 1 }, // Single image
        { name: 'documents', maxCount: 3 } // Multiple documents, with a max count
    ]),
    CreateInvestor
);
router.put(
    '/:id',
    checkUserAuth,
    upload.fields([
        { name: 'image', maxCount: 1 }, // Single image
        { name: 'documents', maxCount: 3 } // Multiple documents, with a max count
    ]),
    UpdateInvestor
);
// router.put('/:id', checkUserAuth, UpdateInvestor);
router.get('/:id?', checkUserAuth, GetInvestors);
router.delete('/:id', checkUserAuth, DeleteInvestor);

// router.put('/update-user-profile', checkUserAuth, upload.single('image'), uploadProfile);



////////////////////////  **************************  /////////////////////////////
export default router;