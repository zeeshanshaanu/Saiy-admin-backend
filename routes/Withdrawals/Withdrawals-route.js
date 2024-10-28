import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import { CreateWithdrawal, DeleteWithdrawal, GetWithdrawals } from '../../controllers/Withdrawals-Controller.js';


////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

router.post('', checkUserAuth, upload.single('image'), CreateWithdrawal);
router.get('/:id?', checkUserAuth, GetWithdrawals);
// router.put('/:id', checkUserAuth, upload.fields([{ name: 'image', maxCount: 1 }]), UpdateAssociate)
router.delete('/:id', checkUserAuth, DeleteWithdrawal);

////////////////////////  **************************  /////////////////////////////
export default router;