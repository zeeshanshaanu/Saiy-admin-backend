import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import {
    CreateAssociate,
    DeleteAssociate,
    GetAssociate,
    UpdateAssociate
} from '../../controllers/Associate-Controller.js';


////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

router.post('', checkUserAuth, upload.single('image'), CreateAssociate);
router.get('/:id?', checkUserAuth, GetAssociate);
router.put('/:id', checkUserAuth, upload.fields([{ name: 'image', maxCount: 1 }]), UpdateAssociate)
router.delete('/:id', checkUserAuth, DeleteAssociate);

////////////////////////  **************************  /////////////////////////////
export default router;