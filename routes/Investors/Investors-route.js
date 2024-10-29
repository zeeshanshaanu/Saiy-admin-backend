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
<<<<<<< HEAD
=======

>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
router.put(
    '/:id',
    checkUserAuth,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'documents', maxCount: 3 }
    ]),
    UpdateInvestor
);
<<<<<<< HEAD
=======

>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
router.get('/:id?', checkUserAuth, GetInvestors);
router.delete('/:id', checkUserAuth, DeleteInvestor);




////////////////////////  **************************  /////////////////////////////
export default router;