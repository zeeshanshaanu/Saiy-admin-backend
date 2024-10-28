import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
import { CreateNotification, DeleteNotification, GetNotifications } from '../../controllers/Notification-Controller.js';


////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

router.post('', checkUserAuth, upload.single('image'), CreateNotification);
router.get('/:id?', checkUserAuth, GetNotifications);
// router.put('/:id', checkUserAuth, upload.fields([{ name: 'image', maxCount: 1 }]), UpdateAssociate)
router.delete('/:id', checkUserAuth, DeleteNotification);

////////////////////////  **************************  /////////////////////////////
export default router;